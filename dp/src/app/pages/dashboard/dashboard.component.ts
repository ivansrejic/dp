import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isAdmin = user?.role === 'admin';
    });
  }

  logout() {
    this.authService.logout();
  }
}
