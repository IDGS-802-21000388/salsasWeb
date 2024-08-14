import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { ProviderService } from '../../../services/provider.service';
import { MedidaService } from '../../../services/medida.service';
import { CompraService } from '../../../services/compra.service';
import { DetalleMateriaPrima, MateriaPrima, Medida } from '../../../interfaces/materiaPrima';
import { Proveedor } from '../../../interfaces/proveedor';
import { Compra } from '../../../interfaces/compra';

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['./detalle-compras.component.css']
})
export class DetalleComprasComponent implements OnInit {

  comprasDetalladas: (Compra & { nombreMateria: string, tipoMedida: string, nombreProveedor: string, fechaCompra: Date, fechaVencimiento: Date })[] = [];
  displayedColumns: string[] = [
    'nombreMateria',
    'tipoMedida',
    'cantidadComprada',
    'nombreProveedor',
    'fechaCompra',
    'fechaVencimiento'
    ];


  dataSource = new MatTableDataSource<(Compra & { nombreMateria: string, tipoMedida: string, nombreProveedor: string, fechaCompra: Date, fechaVencimiento: Date })>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private compraService: CompraService,
    private materiaPrimaService: MateriaPrimaService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private proveedorService: ProviderService,
    private medidaService: MedidaService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetalleComprasComponent>,
  ) {}

  ngOnInit(): void {
    this.loadComprasDetalladas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadComprasDetalladas(): void {
    this.compraService.getCompras().subscribe((compras: Compra[]) => {
      this.materiaPrimaService.getMateriasPrimas().subscribe((materias: MateriaPrima[]) => {
        this.detalleMateriaPrimaService.getDetalleMateriasPrimas().subscribe((detalles: DetalleMateriaPrima[]) => {
          this.proveedorService.getProviders().subscribe((proveedores: Proveedor[]) => {
            this.medidaService.getMedidas().subscribe((medidas: Medida[]) => {
              
              this.comprasDetalladas = compras.map(compra => {
                const materia = materias.find(m => m.idMateriaPrima === compra.idMateriaPrima);
                const detalle = detalles.find(d => d.idDetalleMateriaPrima === compra.idDetalle_materia_prima);
                const proveedor = proveedores.find(p => p.idProveedor === materia?.idProveedor);
                const medida = medidas.find(med => med.idMedida === materia?.idMedida);

                return {
                  ...compra,
                  nombreMateria: materia?.nombreMateria || 'N/A',
                  tipoMedida: medida?.tipoMedida || 'N/A',
                  nombreProveedor: proveedor?.nombreProveedor || 'N/A',
                  fechaCompra: detalle?.fechaCompra || new Date(),
                  fechaVencimiento: detalle?.fechaVencimiento || new Date(),
                  estatus: detalle?.estatus || 0
                };
              });

              this.comprasDetalladas.forEach(item => {
                item.fechaVencimiento = new Date(item.fechaVencimiento);
              });

              this.dataSource.data = this.comprasDetalladas;
              console.log('Compras Detalladas:', this.comprasDetalladas);
            });
          });
        });
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
