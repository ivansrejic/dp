import { Component, Input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isAdmin: any;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
