import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { OrderService } from '../../shared/order.service';
import { UserData } from '../../models/user-data.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  user: UserData | undefined;
  orders: any = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.orderService.getAllOrders().subscribe((orders) => {
          if (user.role === 'admin') {
            this.orders = orders;
            this.isAdmin = true;
            console.log('ADMIN', this.orders);
          } else {
            this.orders = orders.filter((order) => order.user.id === user.id);
            console.log('CUSTOMER', this.orders);
          }
        });
      }
    });
  }

  deliverOrder(orderID: string) {
    this.orderService
      .deliverOrder(orderID)
      .then(() => {
        alert('Order delivered');
      })
      .catch((error) => {
        console.error('Error delivering order:', error);
      });
  }

  cancelOrder(orderID: string) {
    this.orderService
      .cancelOrder(orderID)
      .then(() => {
        alert('Order canceled');
      })
      .catch((error) => {
        console.error('Error canceling order:', error);
      });
  }
}
