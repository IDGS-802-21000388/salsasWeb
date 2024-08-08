import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { CompraService } from '../../../services/compra.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { MateriaPrima, DetalleMateriaPrima } from '../../../interfaces/materiaPrima';
import { Compra } from '../../../interfaces/compra';

@Component({
  selector: 'app-compras-form',
  templateUrl: './compras-form.component.html',
  styleUrls: ['./compras-form.component.css']
})
export class ComprasFormComponent {
  compraForm: FormGroup;
  maxCantidad = 4000; // Máxima cantidad permitida

  constructor(
    private fb: FormBuilder,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private compraService: CompraService,
    private materiaPrimaService: MateriaPrimaService,
    private dialogRef: MatDialogRef<ComprasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { materiaDetalle: MateriaPrima & DetalleMateriaPrima & { nombreProveedor: string, tipoMedida: string } }
  ) {
    this.compraForm = this.fb.group({
      precioCompra: [data.materiaDetalle.precioCompra, Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0)]], // Inicializa la cantidad en 0 y previene números negativos
      fechaCompra: [new Date(), Validators.required],
      fechaVencimiento: [data.materiaDetalle.fechaVencimiento, [Validators.required, this.dateNotInPastValidator]] // Validación personalizada para la fecha
    });
  }

  // Verificar si la cantidad total supera el máximo permitido
  get isMaxCantidadExceeded(): boolean {
    return this.data.materiaDetalle.cantidadExistentes > this.maxCantidad;
  }

  // Validador personalizado para asegurarse de que la fecha no sea en el pasado
  dateNotInPastValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate < currentDate) {
      return { dateInPast: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const cantidadCompra = this.compraForm.get('cantidad')?.value;
      const fechaVencimiento = this.compraForm.get('fechaVencimiento')?.value;

      console.log("Cantidad Comprada:", cantidadCompra);
      const nuevaCantidadExistente = this.data.materiaDetalle.cantidadExistentes + cantidadCompra;

      if (nuevaCantidadExistente > this.maxCantidad) {
        console.log("La cantidad total supera el máximo permitido.");
        return;
      }

      // Actualizar la cantidad en MateriaPrima antes de registrar la compra
      this.materiaPrimaService.updateCantidad(this.data.materiaDetalle.idMateriaPrima, nuevaCantidadExistente).subscribe(() => {

        // Actualizar el detalle de materia prima
        const detalleMateriaPrimaActualizado = {
          ...this.data.materiaDetalle,
          fechaCompra: new Date(),
          fechaVencimiento: fechaVencimiento,
          cantidadExistentes: nuevaCantidadExistente,
        };

        this.detalleMateriaPrimaService.updateDetalleMateriaPrima(this.data.materiaDetalle.idDetalleMateriaPrima, detalleMateriaPrimaActualizado).subscribe(() => {
          const compra = {
            idCompra: 0, // Asignado por el backend
            idMateriaPrima: this.data.materiaDetalle.idMateriaPrima,
            idDetalleMateriaPrima: this.data.materiaDetalle.idDetalleMateriaPrima,
            cantidadComprada: cantidadCompra,
          };

          // Imprimir los datos de 'compra' en la consola
          console.log("DATA:", JSON.stringify(compra, null, 2));

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
