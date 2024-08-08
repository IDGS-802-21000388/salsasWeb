import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { ProviderService } from '../../../services/provider.service';
import { MedidaService } from '../../../services/medida.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { AlertService } from '../../../services/alert.service';
import { CompraService } from '../../../services/compra.service';
import { MateriaPrima } from '../../../interfaces/materiaPrima';
import { Proveedor } from '../../../interfaces/proveedor';
import { Medida } from '../../../interfaces/medida';
import { DetalleMateriaPrima } from '../../../interfaces/detalleMateriaPrima';
import { Compra } from '../../../interfaces/compra';

@Component({
  selector: 'app-materia-prima-form',
  templateUrl: './materia-prima-form.component.html',
  styleUrl: './materia-prima-form.component.css'
})
export class MateriaPrimaFormComponent implements OnInit {
  materiaPrimaForm: FormGroup;
  proveedores: Proveedor[] = [];
  medidas: Medida[] = [];
  isEditMode = false;
  hoy: string;

  constructor(
    private fb: FormBuilder,
    private materiaPrimaService: MateriaPrimaService,
    private detalleMateriaPrimaService: DetalleMateriaPrimaService,
    private proveedorService: ProviderService,
    private medidaService: MedidaService,
    private compraService: CompraService,
    private dialogRef: MatDialogRef<MateriaPrimaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
  ) {
    const today = new Date();
    this.hoy = this.formatDate(today);

    this.materiaPrimaForm = this.fb.group({
      idMateriaPrima: [null],
      nombreMateria: ['', Validators.required],
      precioCompra: [0, Validators.required],
      cantidad: [0, Validators.required],
      idMedida: [null, Validators.required],
      idProveedor: [null, Validators.required],
    });

    if (data && data.materia) {
      this.isEditMode = data.isEditMode || false;
      this.materiaPrimaForm.patchValue(data.materia);
    }
  }

  ngOnInit(): void {
    this.proveedorService.getProviders().subscribe((proveedores: Proveedor[]) => {
      this.proveedores = proveedores;
    });

    this.medidaService.getMedidas().subscribe((medidas: Medida[]) => {
      this.medidas = medidas;
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  onSubmit(): void {
    if (this.materiaPrimaForm.valid) {
      const idMateriaPrima = this.materiaPrimaForm.value.idMateriaPrima || 0;
      const materiaPrimaDate: MateriaPrima = {
        idMateriaPrima: idMateriaPrima,
        nombreMateria: this.materiaPrimaForm.value.nombreMateria,
        precioCompra: this.materiaPrimaForm.value.precioCompra,
        cantidad: this.materiaPrimaForm.value.cantidad,
        idMedida: this.materiaPrimaForm.value.idMedida,
        idProveedor: this.materiaPrimaForm.value.idProveedor,
      };

      const fechaVencimiento = this.formatDate(this.materiaPrimaForm.value.fechaVencimiento);
      const fechaCompra = this.hoy;

      const detalleMateriaPrima: DetalleMateriaPrima = {
        idDetalleMateriaPrima: 0,
        idMateriaPrima: idMateriaPrima,
        fechaCompra: new Date,
        fechaVencimiento: new Date,
        cantidadExistentes: materiaPrimaDate.cantidad,
        porcentaje: 0,
        estatus: 1
      };

      if (this.isEditMode) {
        this.updateMateriaPrima(materiaPrimaDate, fechaVencimiento, detalleMateriaPrima);
      } else {
        this.createMateriaPrima(materiaPrimaDate, fechaVencimiento, detalleMateriaPrima);
      }
    }
  }

  private createMateriaPrima(materiaPrima: MateriaPrima, fechaVencimiento: string, detalleMateriaPrima: DetalleMateriaPrima): void {
    this.materiaPrimaService.createMateriaPrima(materiaPrima).subscribe(
      (createdMateriaPrima: MateriaPrima) => {
        detalleMateriaPrima.idMateriaPrima = createdMateriaPrima.idMateriaPrima;
        this.createDetalleMateriaPrima(detalleMateriaPrima);
        this.dialogRef.close(true);
        this.alertService.success('El producto ha sido creado exitosamente.', 'Producto Creado');
      },
      error => {
        this.alertService.error(`Error al crear la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  private updateMateriaPrima(materiaPrima: MateriaPrima, fechaVencimiento: string, detalleMateriaPrima: DetalleMateriaPrima): void {
    this.materiaPrimaService.updateMateriaPrima(materiaPrima.idMateriaPrima, materiaPrima).subscribe(
      () => {
        this.detalleMateriaPrimaService.getDetalleMateriaPrimaByMateriaPrimaId(materiaPrima.idMateriaPrima).subscribe(
          (detalle: DetalleMateriaPrima) => {
            detalle.fechaVencimiento = new Date;
            detalle.cantidadExistentes = materiaPrima.cantidad;
            this.detalleMateriaPrimaService.updateDetalleMateriaPrima(detalle.idDetalleMateriaPrima, detalle).subscribe(
              () => {
                this.dialogRef.close(true);
                this.alertService.success('La materia prima y su detalle han sido actualizados exitosamente.', 'Materia Prima Actualizada');
              },
              error => {
                this.alertService.error(`Error al actualizar el detalle de la materia prima: ${error.error.message || error.message}`);
              }
            );
          },
          error => {
            this.alertService.error(`Error al obtener el detalle de la materia prima: ${error.error.message || error.message}`);
          }
        );
      },
      error => {
        this.alertService.error(`Error al actualizar la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  private createDetalleMateriaPrima(detalleMateriaPrima: DetalleMateriaPrima): void {
    this.detalleMateriaPrimaService.createDetalleMateriaPrima(detalleMateriaPrima).subscribe(
      () => {
        this.dialogRef.close(true);
        this.alertService.success('La materia prima y su detalle han sido creados exitosamente.', 'Materia Prima Creada');
      },
      error => {
        this.alertService.error(`Error al crear el detalle de la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}