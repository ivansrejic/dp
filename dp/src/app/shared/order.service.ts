import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  createOrder(userID: string, cart: Product[]) {
    const orderID = this.firestore.createId();

    console.log('Cart sdsa', cart);

    const order = {
      userID: userID,
      orderID: orderID,
      products: cart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.cart_quantity || 1,
      })),
      totalAmount: cart.reduce(
        (sum, product) => sum + product.price * (product.cart_quantity || 1),
        0
      ),
      status: 'Pending',
      createdAt: new Date(),
    };
    return this.firestore.collection('orders').add(order);
  }
}
