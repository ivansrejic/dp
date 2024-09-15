import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductsService } from '../../shared/products.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  logout() {
    this.authService.logout();
  }

  // addProducts() {
  //   this.productService.addProducts();
  // }
}
