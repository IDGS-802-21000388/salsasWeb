import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecetaService } from '../../../services/receta.service';
import { RecetaFormComponent } from '../receta-form/receta-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { Receta } from '../../../interfaces/receta';
import { Producto } from '../../../interfaces/productos';
import { DetalleReceta } from '../../../interfaces/receta';
import { forkJoin } from 'rxjs';
import { AddStockComponent } from '../add-stock/add-stock.component';


@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrl: './receta-list.component.css'
})
export class RecetaListComponent {

  receta: Receta[] = [];
  productos: Producto[] = [];
  detalleReceta: DetalleReceta[] = [];
  displayedColumns: string[] = ['nombreProducto','precioVenta','precioProduccion','cantidad','stock','fotografia', 'acciones'];
  dataSource = new MatTableDataSource<Receta>();
  dataSourceDR = new MatTableDataSource<DetalleReceta>();
  dataSourceP = new MatTableDataSource<Producto>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private recetaService: RecetaService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadReceta();
  }

  loadReceta(): void {
    this.recetaService.getDetalleReceta().subscribe((data: Receta[]) => {
      this.receta = data;
      this.dataSource.data = this.receta;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getDetalleProducto(receta: Receta): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(RecetaFormComponent, {
      width: '600px',
      data: { receta }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadReceta();
        this.alertService.success('El proveedor ha sido actualizado exitosamente.', 'Proveedor Actualizado');
      }
    });
  }

  createReceta(): void {
    this.isModalOpen = true;
    localStorage.removeItem('ingredientes');
    const dialogRef = this.dialog.open(RecetaFormComponent, {
      width: '1200px',
      maxWidth: '1070px' 
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadReceta();
        this.alertService.success('La receta se ha creado correctamente', 'Receta Creada');
      }
    });
  }

  editarReceta(id: number): void {
    this.isModalOpen = true;
    localStorage.removeItem('ingredientes');
    
    // Llamadas a las APIs
    const obsDetalleReceta = this.recetaService.getDetalleRecetaId(id);
    const obsProducto = this.recetaService.getProducto(id);
  
    forkJoin([obsDetalleReceta, obsProducto]).subscribe({
      next: ([detalleReceta, producto]) => {
        // Guardar los detalles de la receta en localStorage
        localStorage.setItem('ingredientes', JSON.stringify(detalleReceta));
  
        // Datos para configurar los inputs del formulario
        const dataForModal = {
          producto,
          isEditMode: true
        };
  
        // Abrir el modal con los datos
        const dialogRef = this.dialog.open(RecetaFormComponent, {
          width: '1200px',
          maxWidth: '1070px',
          data: dataForModal  // Pasar datos al modal
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.isModalOpen = false;
          if (result) {
            this.loadReceta();
            this.alertService.success('La receta se ha actualizado correctamente', 'Receta Actualizada');
          }
        });
      },
      error: error => {
        console.error('Error al obtener datos:', error);
        this.isModalOpen = false;
      }
    });
  }

  eliminarReceta(idProducto: number): void {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el producto?`).then((result) => {
      if (result.isConfirmed) {
        this.recetaService.updateProductoEstatus(idProducto).subscribe(() => {
          this.loadReceta();
          this.alertService.success('La receta ha sido eliminada.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar la receta: ${error.error.message || error.message}`);
        });
      }
    });
    
  }

  agregarStock(idProducto: number): void {
    console.log('Agregar stock para producto:', idProducto);
    const dialogRef = this.dialog.open(AddStockComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        const cantidadAgregar = result;
  
        this.recetaService.agregarStock(idProducto, cantidadAgregar).subscribe({
          next: (response) => {
            this.alertService.success('Stock agregado correctamente.', 'Operación exitosa');
            this.loadReceta(); // Recargar la lista de recetas para mostrar el nuevo stock
          },
          error: (error) => {
            this.alertService.error(`Error al agregar el stock: ${error.error.text || error.message}`);
          }
        });
      }
    });
  }
  
  

  
}
