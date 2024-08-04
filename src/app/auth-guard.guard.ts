// auth-guard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn()) {
      if (this.authService.hasRole(expectedRoles)) {
        return true;
      } else {
        this.alertService.error('No tienes permiso para acceder a esta página. Redirigiendo al inicio.', 'Acceso Denegado');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.alertService.error('No estás autenticado.', 'Acceso Denegado');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
