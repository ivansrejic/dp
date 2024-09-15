import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { UserData } from '../models/user-data.model';

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
      })),
      totalAmount: cart.reduce(
        (sum, product) => sum + product.price * (product.cart_quantity || 1),
        0
      ),
      status: 'Pending',
      createdAt: new Date(),
    };

    console.log('Order', order);
    return this.firestore.collection('orders').add(order);
  }
}
