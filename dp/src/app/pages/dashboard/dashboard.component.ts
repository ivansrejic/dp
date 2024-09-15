import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ProductsService } from '../../shared/products.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  category: string | undefined;
  brand: string | undefined;
  products: Array<Product> = [];

  categories: Array<string> = [];
  brands: Array<string> = [];

  filteredProducts: Array<Product> = [];

  cart: Array<Product> = [];

  constructor(
    private authService: AuthService,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;

      this.categories = [
        ...new Set(products.map((product) => product.category)),
      ];

      this.brands = [...new Set(products.map((product) => product.brand))];
      console.log(this.categories);
      console.log(this.brands);
    });
  }

  logout() {
    this.authService.logout();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.category ? product.category === this.category : true) &&
        (this.brand ? product.brand === this.brand : true)
      );
    });
  }
  onShowCategory(newCategory: string | undefined): void {
    this.category = newCategory;
    this.filterProducts();
  }

  onShowBrand(newBrand: string | undefined): void {
    this.brand = newBrand;
    this.filterProducts();
  }

  addToCart(productID: number) {
    const product = this.products.find((product) => product.id === productID);
    if (product) {
      this.cartService.addToCart(product);
    }

    this.cartService.getCart().subscribe((cart) => console.log(cart));
  }
}
