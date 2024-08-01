// landing-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos';
import { ProductoService } from '../../../services/producto.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  productosDestacados: Producto[] = [];
  cartItems: Producto[] = [];

  constructor(private productoService: ProductoService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productosDestacados = productos.slice(0, 4);
    });
    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
    this.cartItems = this.cartService.getCartItems();
  }
}