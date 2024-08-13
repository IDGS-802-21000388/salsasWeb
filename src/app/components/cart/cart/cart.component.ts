import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../../interfaces/productos';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isVisible: boolean = true;
  cartItems: { producto: Producto, cantidad: number }[] = [];
  productQuantities: { [key: number]: number } = {}; // Inicialmente vacío

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: { producto: Producto, cantidad: number }[] },
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      // Inicializa productQuantities para que cada producto tenga un valor predeterminado (por ejemplo, 1)
      this.productQuantities = items.reduce((acc, item) => {
        acc[item.producto.idProducto] = item.cantidad || 1; // Usa la cantidad del item, o 1 si no está definida
        return acc;
      }, {} as { [key: number]: number });
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

  updateQuantity(product: Producto): void {
    const quantity = this.productQuantities[product.idProducto] || 1;
    this.cartService.updateQuantity(product.idProducto, quantity);
  }
}
