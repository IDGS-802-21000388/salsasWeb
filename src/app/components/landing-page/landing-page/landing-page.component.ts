import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  productosDestacados: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productosDestacados = productos.slice(0, 4);
    });
  }
}
