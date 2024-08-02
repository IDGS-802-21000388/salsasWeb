// cart.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../interfaces/productos';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  isVisible: boolean = true;  // Propiedad para controlar la visibilidad

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: Producto[] }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  get cartItems(): Producto[] {
    return this.data.cartItems;
  }

  goToCart(): void {
    // Lógica para ir al carrito completo o proceder a la compra
    this.dialogRef.close();
  }
}
