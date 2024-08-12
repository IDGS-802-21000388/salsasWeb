import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { ProviderService } from '../../../services/provider.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { MateriaPrima, DetalleMateriaPrima } from '../../../interfaces/materiaPrima';
import { MateriaPrimaFormComponent } from '../materia-prima-form/materia-prima-form.component';
import { MermaInventarioComponent } from '../merma-inventario/merma-inventario.component';
import { Proveedor } from '../../../interfaces/proveedor';
import { MedidaService } from '../../../services/medida.service';
import { Medida } from '../../../interfaces/medida';
import { MermaInventario } from '../../../interfaces/mermaInventario';

@Component({
  selector: 'app-materia-prima-list',
  templateUrl: './materia-prima-list.component.html',
  styleUrls: ['./materia-prima-list.component.css']
})
export class MateriaPrimaListComponent implements OnInit, AfterViewInit {
  materiasPrimas: (MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string })[] = [];
  displayedColumns: string[] = [
    'nombreMateria',
    'precioCompra',
    'cantidad',
    'tipoMedida',
    'nombreProveedor',
    'fechaVencimiento',
    'estatus',
    'acciones'
  ];

  dataSource = new MatTableDataSource<(MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string })>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private proveedorService: ProviderService,
    private medidaService: MedidaService,
    private mermaInventarioService: MermaInventarioService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadMateriasPrimas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe((materias: MateriaPrima[]) => {
      this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((detalles: DetalleMateriaPrima[]) => {
        this.proveedorService.getProviders().subscribe((proveedores: Proveedor[]) => {
          this.medidaService.getMedidas().subscribe((medidas: Medida[]) => {
            this.materiasPrimas = materias.map(materia => {
              const detalle = detalles.find(detalle => detalle.idMateriaPrima === materia.idMateriaPrima) || {
                idDetalleMateriaPrima: 0,
                idMateriaPrima: materia.idMateriaPrima,
                fechaCompra: new Date(),
                fechaVencimiento: new Date(),
                cantidadExistentes: 0,
                porcentaje: 0,
                estatus: 0
              } as DetalleMateriaPrima;
              const proveedor = proveedores.find(prov => prov.idProveedor === materia.idProveedor) || { nombreProveedor: 'N/A' };
              const medida = medidas.find(med => med.idMedida === materia.idMedida) || { tipoMedida: 'N/A' };
              return { ...materia, ...detalle, nombreProveedor: proveedor.nombreProveedor, tipoMedida: medida.tipoMedida };
            });

            this.materiasPrimas.forEach(item => {
              item.fechaVencimiento = new Date(item.fechaVencimiento);
            });
            this.materiasPrimas.sort((a, b) => a.fechaVencimiento.getTime() - b.fechaVencimiento.getTime());

            this.dataSource.data = this.materiasPrimas;
            console.log('Materias Primas:', this.materiasPrimas);

            // Filtro de materias primas con cantidad menor a 20
            const materiasPrimasPorResurtir = this.materiasPrimas.filter(materia => materia.cantidadExistentes < 20);

            if (materiasPrimasPorResurtir.length > 0) {
                let mensajeAlerta = 'Las siguientes materias primas necesitan ser resurtidas:';
                
                if (materiasPrimasPorResurtir.length === 1) {
                    mensajeAlerta = 'La siguiente materia prima necesita ser resurtida:';
                }
                materiasPrimasPorResurtir.forEach(materia => {
                    mensajeAlerta += `\n- ${materia.nombreMateria}`;
                });

                this.alertService.warning(mensajeAlerta, 'Resurtir Materias Primas');
            }
          });
        });
      });
    });
  }

  editMateriaPrima(materia: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string }): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(MateriaPrimaFormComponent, {
      width: '600px',
      data: { 
        materia,
        isEditMode: true
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadMateriasPrimas();
        this.alertService.success('La materia prima ha sido actualizada exitosamente.', 'Materia Prima Actualizada');
      }
    });
  }
  
  deleteDetalleMateriaPrima(detalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string }): void {
    console.log('ID del detalle a eliminar:', detalle.idDetalleMateriaPrima);
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el detalle de la materia prima?`).then(result => {
      if (result.isConfirmed) {
        this.detalleMateriaPrimaService.deleteDetalleMateriaPrima(detalle.idDetalleMateriaPrima).subscribe(() => {
          this.loadMateriasPrimas();
          this.alertService.success('El detalle de la materia prima ha sido eliminado.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar el detalle de la materia prima: ${error.error.message || error.message}`);
        });
      }
    });
  }

  activateDetalleMateriaPrima(detalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string }): void {
    this.alertService.confirm(`¿Estás seguro de que quieres activar el detalle de la materia prima?`).then(result => {
      if (result.isConfirmed) {
        this.detalleMateriaPrimaService.updateDetalleMateriaPrima(detalle.idDetalleMateriaPrima, { ...detalle, estatus: 1 }).subscribe(() => {
          this.loadMateriasPrimas();
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

  registerMerma(detalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string }): void {
    const dialogRef = this.dialog.open(MermaInventarioComponent, {
      width: '600px',
      data: { detalle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMateriasPrimas();
      }
    });
  }

  updateCantidadDetalleMateriaPrima(idDetalle: number, cantidadMerma: number): void {
    this.detalleMateriaPrimaService.getDetalleMateriaPrima(idDetalle).subscribe((detalle) => {
      const nuevaCantidad = detalle.cantidadExistentes - cantidadMerma;
      if (nuevaCantidad < 0) {
        this.alertService.error('La cantidad de merma no puede ser mayor que la cantidad existente.');
        return;
      }
      this.detalleMateriaPrimaService.updateDetalleMateriaPrima(idDetalle, { ...detalle, cantidadExistentes: nuevaCantidad }).subscribe(() => {
        this.loadMateriasPrimas();
        this.alertService.success('La cantidad del detalle de la materia prima ha sido actualizada.', 'Actualización');
      }, error => {
        this.alertService.error(`Error al actualizar la cantidad del detalle de la materia prima: ${error.error.message || error.message}`);
      });
    });
  }
}
