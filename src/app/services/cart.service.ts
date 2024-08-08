import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartSubject = new BehaviorSubject<Producto[]>(this.loadCartItems());
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  private loadCartItems(): Producto[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(product: Producto): void {
    const items = this.loadCartItems();
    items.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartSubject.next(items); // Emitir los cambios
  }

  removeFromCart(product: Producto): void {
    let items = this.loadCartItems();
    items = items.filter(item => item.idProducto !== product.idProducto);
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartSubject.next(items); // Emitir los cambios
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next([]); // Emitir los cambios
  }
}
