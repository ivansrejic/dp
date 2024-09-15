import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductsService } from '../../shared/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  category: string | undefined;
  products: Array<Product> = [];

  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products); // Check the retrieved products in the console
    });
  }

  logout() {
    this.authService.logout();
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.products = this.products.filter((product) => product.size === 'L');
  }
}
