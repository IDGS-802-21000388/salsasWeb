import { Component, ViewChild } from '@angular/core';
import { DetalleMateriaPrima, MateriaPrima, Medida } from '../../../interfaces/materiaPrima';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { ProviderService } from '../../../services/provider.service';
import { MedidaService } from '../../../services/medida.service';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { MateriaPrimaFormComponent } from '../../materia-prima/materia-prima-form/materia-prima-form.component';
import { MermaInventarioComponent } from '../../materia-prima/merma-inventario/merma-inventario.component';
import { ComprasFormComponent } from '../compras-form/compras-form.component';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrl: './compras-list.component.css'
})
export class ComprasListComponent {
  materiasPrimas: (MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string })[] = [];
  displayedColumns: string[] = [
    'nombreMateria',
    'precioCompra',
    'nombreProveedor',
    'fechaCompra',
    'fechaVencimiento',
    'cantidad',
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
          });
        });
      });
    });
  }

  openComprasForm(materiaDetalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string }): void {
    const dialogRef = this.dialog.open(ComprasFormComponent, {
      width: '600px',
      data: { materiaDetalle }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMateriasPrimas();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
