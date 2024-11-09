import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../../interfaces/productos'; // Verifica la ruta
import { ProductoService } from '../../../services/producto.service'; // Verifica la ruta
import { CartService } from '../../../services/cart.service'; // Verifica la ruta
import { ProductoModalComponent } from '../../producto-modal/producto-modal/producto-modal.component';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css']
})
export class PuntoVentaComponent implements OnInit {
  productosAgrupados: any = {};
  productosKeys: string[] = [];
  salsaDesplegada: string | null = null; // Almacenar solo una salsa desplegada

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      const productosFiltrados = productos.filter(producto => producto.estatus === true);
      this.productosAgrupados = this.groupProductosBySalsa(productosFiltrados);
      this.productosKeys = Object.keys(this.productosAgrupados); // Guardamos las claves

      // Si hay claves disponibles, despliega la primera salsa por defecto
      if (this.productosKeys.length > 0) {
        this.salsaDesplegada = this.productosKeys[0];
      }
    });
  }

  openModal(key: string): void {
    const dialogRef = this.dialog.open(ProductoModalComponent, {
      width: '400px',
      data: {
        productos: this.productosAgrupados[key],
        salsaKey: key
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  groupProductosBySalsa(productos: Producto[]): any {
    const productosAgrupados: any = {};

    productos.forEach((producto) => {
      const nombreBase = producto.nombreProducto.split(' ').slice(0, -1).join(' ');

      if (!productosAgrupados[nombreBase]) {
        productosAgrupados[nombreBase] = [];
      }

      productosAgrupados[nombreBase].push(producto);
    });

    return productosAgrupados;
  }
}
