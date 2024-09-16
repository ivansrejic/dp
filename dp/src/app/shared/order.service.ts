import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { UserData } from '../models/user-data.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  createOrder(user: UserData, cart: Product[]) {
    const orderID = this.firestore.createId();

    const order = {
      user: user,
      orderID: orderID,
      products: cart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.cart_quantity || 1,
        img: product.img,
      })),
      totalAmount: cart.reduce(
        (sum, product) => sum + product.price * (product.cart_quantity || 1),
        0
      ),
      status: 'pending',
      createdAt: new Date(),
    };

    console.log('Order', order);
    return this.firestore.collection('orders').add(order);
  }

  getAllOrders(): Observable<any[]> {
    return this.firestore
      .collection('orders')
      .snapshotChanges()
      .pipe(
        map((actions: any) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  async deliverOrder(orderID: string): Promise<void> {
    try {
      const orderDoc = (await this.firestore
        .collection('orders')
        .doc(orderID)
        .get()
        .toPromise()) as any;
      if (!orderDoc?.exists) {
        throw new Error('Order not found');
      }

      const order = orderDoc?.data();
      if (!order || !order.products) {
        throw new Error('No products in order');
      }

      await this.firestore.collection('orders').doc(orderID).update({
        status: 'delivered',
      });

      for (const product of order.products) {
        const productId = product.id;
        const orderedQuantity = product.quantity || 0;

        // Fetch the product document
        const productDoc = (await this.firestore
          .collection('products')
          .doc(productId)
          .get()
          .toPromise()) as any;
        if (!productDoc.exists) {
          console.error(`Product ${productId} not found`);
          continue;
        }

        const productData = productDoc.data();
        const currentQuantity = productData?.quantity || 0;
        const newQuantity = currentQuantity - orderedQuantity;

        if (newQuantity < 0) {
          console.error(`Insufficient stock for product ${productId}`);
          continue;
        }

        await this.firestore.collection('products').doc(productId).update({
          quantity: newQuantity,
        });
      }
    } catch (error) {
      console.error('Error delivering order:', error);
      throw error;
    }
  }

  cancelOrder(orderID: string): Promise<void> {
    return this.firestore.collection('orders').doc(orderID).update({
      status: 'canceled',
    });
  }
}
