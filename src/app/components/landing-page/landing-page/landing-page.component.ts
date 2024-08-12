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
  cartItems: { producto: Producto, cantidad: number }[] = []; // Cambiar a la estructura correcta

  constructor(private productoService: ProductoService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productosDestacados = productos.slice(0, 4);
    });
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  addToCart(producto: Producto, cantidad: number = 1): void {
    this.cartService.addToCart(producto, cantidad);
    // No es necesario actualizar `cartItems` aquí ya que se actualiza automáticamente con `cart$`
  }
}
