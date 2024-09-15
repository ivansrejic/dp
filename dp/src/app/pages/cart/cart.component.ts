import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Array<Product> | undefined;
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.getCart().subscribe((cart) => (this.cart = cart));
    this.cartService.getTotalAmount().subscribe((amount) => {
      this.totalAmount = amount;
    });
  }

  removeOneItem(productID: number): void {
    this.cartService.removeOneItemFromCart(productID);
  }
}
