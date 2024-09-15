import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../shared/products.service';
import { AuthService } from '../../../shared/auth.service';
import { UserData } from '../../../models/user-data.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addProduct = new EventEmitter<string>();

  user: UserData | undefined;

  isFavorite: boolean | undefined;
  constructor(
    private productService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isFavorite = this.user?.favorites.some(
          (favoriteProduct: any) => favoriteProduct.id === this.product.id
        );
        console.log(this.isFavorite);
      }
    });
  }

  addToCart(id: string) {
    this.addProduct.emit(id);
  }

  addToFavorites(product: Product) {
    if (this.user && this.user.id) {
      this.productService.addProductToFavorites(this.user.id, product);
    }

    console.log('Added to favorites', product);
  }
}
