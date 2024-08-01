// cart.service.ts
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() { }

  getCartItems(): Producto[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(product: Producto): void {
    const items = this.getCartItems();
    items.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
