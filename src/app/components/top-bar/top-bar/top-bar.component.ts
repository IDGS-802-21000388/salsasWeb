import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { CartComponent } from '../../cart/cart/cart.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItems: { producto: Producto; cantidad: number }[] = []; // Actualiza el tipo aquí

  constructor(private dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    const loggedUser = localStorage.getItem('loggedUser');
    this.isLoggedIn = !!loggedUser; 
    console.log('Logged in:', this.isLoggedIn);
  }

  get cartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.cantidad, 0); // Total de cantidades
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
}
