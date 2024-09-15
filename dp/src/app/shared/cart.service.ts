import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalAmountSubject = new BehaviorSubject<number>(0);
  cart$ = this.cartSubject.asObservable();

  totalAmount = 0;

  constructor() {}

  // addToCart(product: Product) {
  //   const currentCart = this.cartSubject.value;
  //   this.cartSubject.next([...currentCart, product]);
  // }

  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find((p) => p.id === product.id);

    if (existingProduct) {
      if ((existingProduct.cart_quantity ?? 0) < product.quantity) {
        existingProduct.cart_quantity =
          (existingProduct.cart_quantity ?? 0) + 1;
        this.cartSubject.next([...currentCart]);
        alert('Product added to the cart');
      } else {
        alert('You already added max amont of items in a cart');
      }
    } else {
      this.cartSubject.next([...currentCart, { ...product, cart_quantity: 1 }]);
      alert('Product added to the cart');
    }
    this.updateTotalAmount();
  }

  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  getTotalAmount(): Observable<number> {
    return this.totalAmountSubject.asObservable();
  }

  private updateTotalAmount(): void {
    const currentCart = this.cartSubject.value;
    const totalAmount = currentCart.reduce(
      (sum, product) => sum + product.price * (product.cart_quantity || 1),
      0
    );
    this.totalAmountSubject.next(totalAmount);
  }

  emptyCart(): void {
    this.cartSubject.next([]);
    this.updateTotalAmount();
  }

  removeOneItemFromCart(productID: number): void {
    // Get the current cart
    const currentCart = this.cartSubject.value;

    // Find the index of the product to remove or update
    const productIndex = currentCart.findIndex(
      (product) => product.id === productID
    );

    if (productIndex !== -1) {
      // Decrease cart_quantity by 1
      const updatedCart = [...currentCart];
      const product = updatedCart[productIndex];

      if (product.cart_quantity && product.cart_quantity > 1) {
        // Reduce quantity if more than 1
        product.cart_quantity--;
      } else {
        // Remove product if quantity is 1 or less
        updatedCart.splice(productIndex, 1);
      }

      // Update the cart with the modified or removed product
      this.cartSubject.next(updatedCart);

      // Update the total amount
      this.updateTotalAmount();
    }
  }
}
