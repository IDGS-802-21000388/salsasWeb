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
  cartItems: { producto: Producto, cantidad: number }[] = [];
  productQuantities: { [key: number]: number } = {};
  total: number = 0; // Propiedad para almacenar el total

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: { producto: Producto, cantidad: number }[] },
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.productQuantities = items.reduce((acc, item) => {
        acc[item.producto.idProducto] = item.cantidad || 1;
        return acc;
      }, {} as { [key: number]: number });
      this.calculateTotal(); // Calcular el total cuando se inicializa el carrito
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
    this.calculateTotal(); // Recalcular el total cuando se elimina un producto
  }

  goToPage(): void {
    this.dialogRef.close();
    this.router.navigate(['/pagoTarjetas']);
  }
  
  updateQuantity(product: Producto): void {
    const quantity = this.productQuantities[product.idProducto] || 1;
    this.cartService.updateQuantity(product.idProducto, quantity);
    this.calculateTotal(); // Recalcular el total cuando se cambia la cantidad
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => {
      return acc + item.producto.precioVenta * this.productQuantities[item.producto.idProducto];
    }, 0);
  }
}
