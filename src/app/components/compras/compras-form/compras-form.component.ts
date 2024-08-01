import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { CompraService } from '../../../services/compra.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service'; // Importa el servicio de MateriaPrima
import { MateriaPrima, DetalleMateriaPrima } from '../../../interfaces/materiaPrima';

@Component({
  selector: 'app-compras-form',
  templateUrl: './compras-form.component.html',
  styleUrls: ['./compras-form.component.css']
})
export class ComprasFormComponent {
  compraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private compraService: CompraService,
    private materiaPrimaService: MateriaPrimaService, // Inyecta el servicio de MateriaPrima
    private dialogRef: MatDialogRef<ComprasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { materiaDetalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string } }
  ) {
    this.compraForm = this.fb.group({
      precioCompra: [data.materiaDetalle.precioCompra],
      cantidad: [0], // Inicializa la cantidad en 0
      fechaCompra: [new Date()],
      fechaVencimiento: [data.materiaDetalle.fechaVencimiento]
    });
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const cantidadCompra = this.compraForm.get('cantidad')?.value;
      const nuevaCantidadExistente = this.data.materiaDetalle.cantidadExistentes + cantidadCompra;

      // Actualizar la cantidad en MateriaPrima antes de registrar la compra
      this.materiaPrimaService.updateCantidad(this.data.materiaDetalle.idMateriaPrima, nuevaCantidadExistente).subscribe(() => {
        
        // Crear el nuevo detalle de materia prima
        const detalleMateriaPrima: DetalleMateriaPrima = {
          idDetalleMateriaPrima: 0, // Asignado por el backend
          idMateriaPrima: this.data.materiaDetalle.idMateriaPrima,
          fechaCompra: new Date,
          fechaVencimiento: this.compraForm.get('fechaVencimiento')?.value,
          cantidadExistentes: cantidadCompra,
          estatus: 1, // Estatus activo
          porcentaje: this.data.materiaDetalle.porcentaje
        };

        this.detalleMateriaPrimaService.createDetalleMateriaPrima(detalleMateriaPrima).subscribe((detalleCreado) => {
          const compra = {
            idCompra: 0, // Asignado por el backend
            idMateriaPrima: detalleCreado.idMateriaPrima,
            idDetalle_materia_prima: detalleCreado.idDetalleMateriaPrima,
            cantidadExistentes: cantidadCompra
          };

          this.compraService.createCompra(compra).subscribe(() => {
            this.dialogRef.close(true);
          });
        });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
