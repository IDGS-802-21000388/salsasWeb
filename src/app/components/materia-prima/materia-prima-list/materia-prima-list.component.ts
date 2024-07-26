import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { MateriaPrima, DetalleMateriaPrima } from '../../../interfaces/materiaPrima';
import { MateriaPrimaFormComponent } from '../materia-prima-form/materia-prima-form.component';

@Component({
  selector: 'app-materia-prima-list',
  templateUrl: './materia-prima-list.component.html',
  styleUrls: ['./materia-prima-list.component.css']
})
export class MateriaPrimaListComponent implements OnInit {
  materiasPrimas: MateriaPrima[] = [];
  detalleMateriasPrimas: DetalleMateriaPrima[] = [];
  displayedColumns: string[] = ['nombreMateria', 'precioCompra', 'cantidad', 'idMedida', 'idProveedor', 'acciones'];
  displayedColumnsDetalle: string[] = ['fechaCompra', 'fechaVencimiento', 'cantidadExistentes', 'porcentaje', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<MateriaPrima>();
  dataSourceDetalle = new MatTableDataSource<DetalleMateriaPrima>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materiaPrimaServic: MateriaPrimaService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadMateriasPrimas();
    this.loadDetalleMateriasPrimas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaServic.getMateriasPrimas().subscribe((data: MateriaPrima[]) => {
      this.materiasPrimas = data;
      this.dataSource.data = this.materiasPrimas;
    });
  }

  loadDetalleMateriasPrimas(): void {
    this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((data: DetalleMateriaPrima[]) => {
      this.detalleMateriasPrimas = data;
      this.dataSourceDetalle.data = this.detalleMateriasPrimas;
    });
  }

  // Métodos para MateriaPrima
  editMateriaPrima(materiaPrima: MateriaPrima): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(MateriaPrimaFormComponent, {
      width: '600px',
      data: { materiaPrima }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadMateriasPrimas();
        this.alertService.success('La materia prima ha sido actualizada exitosamente.', 'Materia Prima Actualizada');
      }
    });
  }

  // Métodos para DetalleMateriaPrima
  editDetalleMateriaPrima(detalleMateriaPrima: DetalleMateriaPrima): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(MateriaPrimaFormComponent, {
      width: '600px',
      data: { detalleMateriaPrima }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadDetalleMateriasPrimas();
        this.alertService.success('El detalle de la materia prima ha sido actualizado exitosamente.', 'Detalle Actualizado');
      }
    });
  }

  deleteDetalleMateriaPrima(detalleMateriaPrima: DetalleMateriaPrima): void {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el detalle de la materia prima?`).then((result) => {
      if (result.isConfirmed) {
        this.detalleMateriaPrimaService.updateDetalleMateriaPrima(detalleMateriaPrima.idDetalle_materia_prima, { ...detalleMateriaPrima, estatus: 0 }).subscribe(() => {
          this.loadDetalleMateriasPrimas();
          this.alertService.success('El detalle de la materia prima ha sido eliminado.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar el detalle de la materia prima: ${error.error.message || error.message}`);
        });
      }
    });
  }

  activateDetalleMateriaPrima(detalleMateriaPrima: DetalleMateriaPrima): void {
    this.alertService.confirm(`¿Estás seguro de que quieres activar el detalle de la materia prima?`).then((result) => {
      if (result.isConfirmed) {
        this.detalleMateriaPrimaService.updateDetalleMateriaPrima(detalleMateriaPrima.idDetalle_materia_prima, { ...detalleMateriaPrima, estatus: 1 }).subscribe(() => {
          this.loadDetalleMateriasPrimas();
          this.alertService.success('El detalle de la materia prima ha sido activado.', 'Activado');
        }, error => {
          this.alertService.error(`Error al activar el detalle de la materia prima: ${error.error.message || error.message}`);
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  createMateriaPrima(): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(MateriaPrimaFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadMateriasPrimas();
        this.alertService.success('La materia prima ha sido creada exitosamente.', 'Materia Prima Creada');
}
});
}
}
