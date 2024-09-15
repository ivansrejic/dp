import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../shared/cart.service';
import { OrderService } from '../../shared/order.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Array<Product> | undefined;
  totalAmount: number = 0;

  userID: string | undefined;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userID = user.id;
      }
    });
    this.cartService.getCart().subscribe((cart) => (this.cart = cart));
    this.cartService.getTotalAmount().subscribe((amount) => {
      this.totalAmount = amount;
    });
  }

  removeOneItem(productID: string): void {
    this.cartService.removeOneItemFromCart(productID);
  }

  createOrder() {
    console.log(this.cart);
    if (this.cart && this.userID) {
      if (this.cart.length === 0) return console.log(Error);
      this.orderService
        .createOrder(this.userID, this.cart)
        .then(() => {
          console.log('Order successfull');
          alert('Uspesna porudzbina');
          this.cartService.emptyCart();
        })
        .catch((error) => {
          console.log('Error');
          alert('Error ');
        });
    } else {
      alert('Ne valja nesto');
    }
  }

  emptyCart() {
    this.cartService.emptyCart();
  }
}
