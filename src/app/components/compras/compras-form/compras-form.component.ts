import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { CompraService } from '../../../services/compra.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { ProviderService } from '../../../services/provider.service';
import {
  MateriaPrima,
  DetalleMateriaPrima,
} from '../../../interfaces/materiaPrima';
import { Proveedor } from '../../../interfaces/proveedor';
import { Compra } from '../../../interfaces/compra';

@Component({
  selector: 'app-compras-form',
  templateUrl: './compras-form.component.html',
  styleUrls: ['./compras-form.component.css'],
})
export class ComprasFormComponent {
  compraForm: FormGroup;
  maxCantidad = 50000; // Máxima cantidad permitida (en gramos)
  cantidadEnKilos = 0;
  proveedores: Proveedor[] = [];
  proveedorSinMateriaPrima = false;

  constructor(
    private fb: FormBuilder,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private compraService: CompraService,
    private materiaPrimaService: MateriaPrimaService,
    private proveedorService: ProviderService,
    private dialogRef: MatDialogRef<ComprasFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      materiaDetalle: MateriaPrima &
        DetalleMateriaPrima & { nombreProveedor: string; tipoMedida: string };
    }
  ) {
    this.compraForm = this.fb.group({
      precioCompra: [data.materiaDetalle.precioCompra, Validators.required],
      cantidad: [
        0,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.maxCantidad),
        ],
      ],
      nuevoProveedor: [null],
      proveedorSinMateriaPrima: [false],
    });

    this.proveedorService.getProviders().subscribe((proveedores) => {
      this.proveedores = proveedores.filter(
        (p) => p.idProveedor !== data.materiaDetalle.idProveedor
      );
    });
  }

  get isMaxCantidadExceeded(): boolean {
    return this.compraForm.get('cantidad')?.value > this.maxCantidad;
  }

  onCantidadChange(): void {
    const cantidadGramos = this.compraForm.get('cantidad')?.value || 0;
    this.cantidadEnKilos = cantidadGramos / 1000;
  }

  onProveedorSinMateriaPrimaChange(event: any): void {
    this.proveedorSinMateriaPrima = event.checked;
  }

  onSubmit(): void {
    if (this.compraForm.invalid) {
      /*
      const cantidadCompra = this.compraForm.get('cantidad')?.value;
      const fechaVencimiento = new Date('2024-10-20');
       */
      return;
    }

    const cantidad = this.compraForm.get('cantidad')?.value;
    const nuevoProveedor = this.compraForm.get('nuevoProveedor')?.value;
    const proveedorSinMateriaPrima = this.compraForm.get(
      'proveedorSinMateriaPrima'
    )?.value;

    // Actualizar la cantidad de materia prima existente
    const updatedDetalle: DetalleMateriaPrima = {
      ...this.data.materiaDetalle,
      cantidadExistentes:
        this.data.materiaDetalle.cantidadExistentes + cantidad,
      fechaCompra: new Date(),
      estatus: 1,
    };

    this.detalleMateriaPrimaService
      .updateDetalleMateriaPrima(
        updatedDetalle.idDetalleMateriaPrima,
        updatedDetalle
      )
      .subscribe(() => {
        // Crear la nueva compra
        const nuevaCompra: Compra = {
          idMateriaPrima: this.data.materiaDetalle.idMateriaPrima,
          idDetalle_materia_prima: updatedDetalle.idDetalleMateriaPrima,
          cantidadComprada: cantidad,
        };

        this.compraService.createCompra(nuevaCompra).subscribe(() => {
          // Si se selecciona un nuevo proveedor, actualizar el proveedor de la materia prima
          if (proveedorSinMateriaPrima && nuevoProveedor) {
            const materiaActualizada: MateriaPrima = {
              ...this.data.materiaDetalle,
              idProveedor: nuevoProveedor,
            };

            this.materiaPrimaService
              .updateMateriaPrima(
                materiaActualizada.idMateriaPrima,
                materiaActualizada
              )
              .subscribe(() => {
                this.dialogRef.close(true);
              });
          } else {
            this.dialogRef.close(true);
          }
        });
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
