import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data['allowedRoles'] as Array<string>;

    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        return !!user && allowedRoles.includes(user.role);
      }),
      tap((isAuthorized) => {
        if (!isAuthorized) {
          console.error('Access denied');
          this.router.navigate(['/login']); // Redirect to login or unauthorized page
        }
      })
    );
  }
}
