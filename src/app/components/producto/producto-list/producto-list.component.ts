import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { Producto } from '../../../interfaces/productos';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  displayedColumns: string[] = ['nombreProducto', 'precioVenta', 'precioProduccion', 'idMedida', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
      this.dataSource.data = this.productos;
    });
  }

  editProducto(producto: Producto): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '600px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadProductos();
        this.alertService.success('El producto ha sido actualizado exitosamente.', 'Producto Actualizado');
      }
    });
  }

  deleteProducto(producto: Producto): void {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el producto ${producto.nombreProducto}?`).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(producto.idProducto).subscribe(() => {
          this.loadProductos();
          this.alertService.success('El producto ha sido eliminado.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar el producto: ${error.error.message || error.message}`);
        });
      }
    });
  }

  activateProducto(producto: Producto): void {
    this.alertService.confirm(`¿Estás seguro de que quieres activar el producto ${producto.nombreProducto}?`).then((result) => {
      if (result.isConfirmed) {
        this.productoService.activateProducto(producto.idProducto).subscribe(() => {
          this.loadProductos();
          this.alertService.success('El producto ha sido activado.', 'Activado');
        }, error => {
          this.alertService.error(`Error al activar el producto: ${error.error.message || error.message}`);
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  createProducto(): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadProductos();
        this.alertService.success('El producto ha sido creado exitosamente.', 'Producto Creado');
      }
    });
  }
}
