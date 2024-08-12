import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cartSubject = new BehaviorSubject<{ producto: Producto, cantidad: number }[]>(this.loadCartItems());
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  private loadCartItems(): { producto: Producto, cantidad: number }[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(product: Producto, quantity: number = 1): void {
    const items = this.loadCartItems();
    const existingItem = items.find(item => item.producto.idProducto === product.idProducto);

    if (existingItem) {
      existingItem.cantidad = quantity;
    } else {
      items.push({ producto: product, cantidad: quantity });
    }
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartSubject.next(items); // Emitir los cambios
  }

  removeFromCart(product: Producto): void {
    let items = this.loadCartItems();
    items = items.filter(item => item.producto.idProducto !== product.idProducto);
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartSubject.next(items); // Emitir los cambios
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.loadCartItems();
    const itemIndex = items.findIndex(item => item.producto.idProducto === productId);
  
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1); // Elimina el producto si la cantidad es 0 o menor
      } else {
        items[itemIndex].cantidad = quantity;
      }
      localStorage.setItem(this.cartKey, JSON.stringify(items));
      this.cartSubject.next(items);
    }
  }
  

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next([]); // Emitir los cambios
  }
}
