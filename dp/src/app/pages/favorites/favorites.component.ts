import { Component } from '@angular/core';
import { UserData } from '../../models/user-data.model';
import { ProductsService } from '../../shared/products.service';
import { AuthService } from '../../shared/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  user: UserData | undefined;
  favorites: Array<Product> | undefined;

  constructor(
    private productService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.favorites = user.favorites;
      }
    });
  }
}
