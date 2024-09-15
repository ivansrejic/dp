import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const encodedToken = localStorage.getItem('token');

    if (!encodedToken) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = atob(encodedToken);
      const tokenData = JSON.parse(decodedToken);

      const userRole = tokenData.role;
      const allowedRoles = next.data['allowedRoles'];

      if (allowedRoles.includes(userRole)) {
        return true;
      } else {
        this.router.navigate(['/dashboard']); //Napravi stranicu, i dugme koje ce da te vrati na stranicu kojoj mozers da pristupis
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
