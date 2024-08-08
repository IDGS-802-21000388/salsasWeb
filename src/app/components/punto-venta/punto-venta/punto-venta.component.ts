import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos'; // Verifica la ruta
import { ProductoService } from '../../../services/producto.service'; // Verifica la ruta
import { CartService } from '../../../services/cart.service'; // Verifica la ruta

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css'] // Asegúrate de usar styleUrls
})
export class PuntoVentaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }
}
