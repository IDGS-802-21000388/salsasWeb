import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MermaInventarioService } from '../../../services/merma-inventario.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { AlertService } from '../../../services/alert.service';
import { MermaInventario } from '../../../interfaces/mermaInventario';
import { DetalleMateriaPrima } from '../../../interfaces/detalleMateriaPrima';

@Component({
  selector: 'app-merma-inventario',
  templateUrl: './merma-inventario.component.html',
  styleUrls: ['./merma-inventario.component.css']
})
export class MermaInventarioComponent implements OnInit {
  mermaForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mermaInventarioService: MermaInventarioService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<MermaInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mermaForm = this.fb.group({
      cantidadMerma: [0, Validators.required],
      fechaMerma: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.detalle) {
      this.isEditMode = true;
      this.mermaForm.patchValue({
        cantidadMerma: this.data.detalle.cantidadMerma,
        fechaMerma: this.data.detalle.fechaMerma
      });
    }
  }

  onSubmit(): void {
    if (this.mermaForm.valid) {
      const { cantidadMerma, fechaMerma } = this.mermaForm.value;
      const nuevaMerma: MermaInventario = {
        idMerma: 0,
        cantidadMerma: cantidadMerma,
        fechaMerma: new Date(fechaMerma),
        idMateriaPrima: this.data.detalle.idMateriaPrima,
        idDetalleMateriaPrima: this.data.detalle.idDetalleMateriaPrima
      };

      this.mermaInventarioService.createMerma(nuevaMerma).subscribe(
        () => {
          this.updateDetalleMateriaPrima(this.data.detalle.idDetalleMateriaPrima, cantidadMerma);
        },
        (error) => {
          this.alertService.error(`Error al registrar la merma: ${error.error.message || error.message}`);
        }
      );
    }
  }

  private updateDetalleMateriaPrima(idDetalleMateriaPrima: number, cantidadMerma: number): void {
    this.detalleMateriaPrimaService.getDetalleMateriaPrima(idDetalleMateriaPrima).subscribe(
      (detalle: DetalleMateriaPrima) => {
        const nuevaCantidadExistente = detalle.cantidadExistentes - cantidadMerma;

        this.detalleMateriaPrimaService.updateCantidadExistente(idDetalleMateriaPrima, nuevaCantidadExistente).subscribe(
          () => {
            this.dialogRef.close(true);
            this.alertService.success('Merma registrada y cantidad actualizada exitosamente.', 'Éxito');
          },
          (error) => {
            this.alertService.error(`Error al actualizar el detalle de la materia prima: ${error.error.message || error.message}`);
          }
        );
      },
      (error) => {
        this.alertService.error(`Error al obtener el detalle de la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
