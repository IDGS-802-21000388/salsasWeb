import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { CartComponent } from '../../cart/cart/cart.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { EncuestaSatisfaccionComponent } from '../../landing-page/encuesta-satisfaccion/encuesta-satisfaccion.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isModalOpen = false;
  loggedUserId = 0;
  cartItems: { producto: Producto; cantidad: number }[] = [];
  showNotification: boolean = false;

  constructor(private dialog: MatDialog, private cartService: CartService, private authService: AuthService,
    private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    const loggedUser = localStorage.getItem('loggedUser');
    this.isLoggedIn = !!loggedUser; 
    console.log('Logged in:', this.isLoggedIn);
    this.checkNotification();
  }

  get cartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.cantidad, 0);
  }

  openCart(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '400px',
      data: { cartItems: this.cartItems }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.cart$.subscribe(cartItems => {
          this.cartItems = cartItems;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('cartItems');
    this.cartService.clearCart();
    this.alertService.success('Has cerrado sesión correctamente.', 'Sesión cerrada');
    this.router.navigate(['/']);
  }

  private checkNotification(): void {
    const fechaCancelacion = localStorage.getItem('fechaCancelacionEncuesta');
    if (fechaCancelacion) {
      const fechaActual = new Date();
      const fechaGuardada = new Date(fechaCancelacion);

      const diferenciaDias = Math.floor((fechaActual.getTime() - fechaGuardada.getTime()) / (1000 * 3600 * 24));

      if (diferenciaDias < 7) {
        this.showNotification = true;
      }
    }
  }

  onNotificationClick(): void {
    this.showNotification = false; 
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(EncuestaSatisfaccionComponent, {
      width: '800px',
    });
  }
}
