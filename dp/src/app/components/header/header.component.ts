import { Component, Input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isAdmin: any;

  cart: Array<Product> | undefined;
  totalAmount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => (this.cart = cart));
    this.cartService.getTotalAmount().subscribe((amount) => {
      this.totalAmount = amount;
    });
  }

  logout() {
    this.authService.logout();
  }

  emptyCart() {
    this.cartService.emptyCart();
  }
}
