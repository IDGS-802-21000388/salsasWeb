import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecetaService } from '../../../services/receta.service';
import { RecetaFormComponent } from '../receta-form/receta-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { Receta } from '../../../interfaces/receta';

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrl: './receta-list.component.css'
})
export class RecetaListComponent {

  receta: Receta[] = [];
  displayedColumns: string[] = ['nombreProducto','cantidad','tipoMedida', 'fotografia', 'acciones'];
  dataSource = new MatTableDataSource<Receta>();
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
    const dialogRef = this.dialog.open(RecetaFormComponent, {
      width: '1200px', // O el ancho que prefieras
      maxWidth: '1070px' // O el máximo ancho que prefieras
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadReceta();
        this.alertService.success('El proveedor ha sido creado exitosamente.', 'Proveedor Creado');
      }
    });
  }

  
}
