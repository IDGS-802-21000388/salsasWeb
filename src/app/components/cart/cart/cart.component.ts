import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../interfaces/productos';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isVisible: boolean = true;
  cartItems: Producto[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: Producto[] },
    private cartService: CartService,
    private router: Router // Inyección del servicio Router
  ) {}
  

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  goToCart(): void {
    this.dialogRef.close();
  }

  removeFromCart(product: Producto): void {
    this.cartService.removeFromCart(product);
  }

  goToPage(): void {
    this.dialogRef.close();
    this.router.navigate(['/pagoTarjetas']);
  }
  
}
