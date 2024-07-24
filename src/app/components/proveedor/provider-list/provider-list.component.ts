import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProviderService } from '../../../services/provider.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { ProviderFormComponent } from '../provider-form/provider-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Proveedor[] = [];
  displayedColumns: string[] = ['nombreProveedor', 'direccion', 'telefono', 'nombreAtiende', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<Proveedor>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private providerService: ProviderService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProviders(): void {
    this.providerService.getProviders().subscribe((data: Proveedor[]) => {
      this.providers = data;
      this.dataSource.data = this.providers;
    });
  }

  editProvider(provider: Proveedor): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(ProviderFormComponent, {
      width: '600px',
      data: { provider }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadProviders();
        this.alertService.success('El proveedor ha sido actualizado exitosamente.', 'Proveedor Actualizado');
      }
    });
  }

  deleteProvider(provider: Proveedor): void {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el proveedor ${provider.nombreProveedor}?`).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteProvider(provider.idProveedor).subscribe(() => {
          this.loadProviders();
          this.alertService.success('El proveedor ha sido eliminado.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar el proveedor: ${error.error.message || error.message}`);
        });
      }
    });
  }

  activateProvider(provider: Proveedor): void {
    this.alertService.confirm(`¿Estás seguro de que quieres activar el proveedor ${provider.nombreProveedor}?`).then((result) => {
      if (result.isConfirmed) {
        this.providerService.activateProvider(provider.idProveedor).subscribe(() => {
          this.loadProviders();
          this.alertService.success('El proveedor ha sido activado.', 'Activado');
        }, error => {
          this.alertService.error(`Error al activar el proveedor: ${error.error.message || error.message}`);
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  createProvider(): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(ProviderFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadProviders();
        this.alertService.success('El proveedor ha sido creado exitosamente.', 'Proveedor Creado');
      }
    });
  }
}
