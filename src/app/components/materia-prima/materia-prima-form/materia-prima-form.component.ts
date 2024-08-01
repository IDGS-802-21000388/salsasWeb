import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { ProviderService } from '../../../services/provider.service';
import { MedidaService } from '../../../services/medida.service';
import { DetalleMateriaPrimaService } from '../../../services/detalle-materia-prima.service';
import { AlertService } from '../../../services/alert.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { Medida } from '../../../interfaces/medida';
import { MateriaPrima } from '../../../interfaces/materiaPrima';

@Component({
  selector: 'app-materia-prima-form',
  templateUrl: './materia-prima-form.component.html',
  styleUrls: ['./materia-prima-form.component.css']
})
export class MateriaPrimaFormComponent implements OnInit {
  materiaPrimaForm: FormGroup;
  proveedores: Proveedor[] = [];
  medidas: Medida[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private materiaPrimaService: MateriaPrimaService,
    private proveedorService: ProviderService,
    private medidaService: MedidaService,
    private dialogRef: MatDialogRef<MateriaPrimaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
  ) {
    this.materiaPrimaForm = this.fb.group({
      idMateriaPrima: [null],
      nombreMateria: ['', Validators.required],
      precioCompra: [0, Validators.required],
      idMedida: [null, Validators.required],
      idProveedor: [null, Validators.required],    });    

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

  onSubmit(): void {
    if (this.materiaPrimaForm.valid) {
      const idMateriaPrima = this.materiaPrimaForm.value.idMateriaPrima || 0;
      const materiaPrimaData: MateriaPrima = {
        idMateriaPrima: idMateriaPrima,
        nombreMateria: this.materiaPrimaForm.value.nombreMateria,
        precioCompra: this.materiaPrimaForm.value.precioCompra,
        cantidad: this.materiaPrimaForm.value.cantidad,
        idMedida: this.materiaPrimaForm.value.idMedida,
        idProveedor: this.materiaPrimaForm.value.idProveedor,
      };
      console.log("Datos " + materiaPrimaData )
  
      if (this.isEditMode) {
        this.updateMateriaPrima(materiaPrimaData);
      } else {
        this.createMateriaPrima(materiaPrimaData);
      }
    } else {
      console.log('Formulario inválido:', this.materiaPrimaForm.errors);
    }
  }
  

  private createMateriaPrima(materiaPrima: MateriaPrima): void {
    this.materiaPrimaService.createMateriaPrima(materiaPrima).subscribe(
      (createdMateriaPrima: MateriaPrima) => {
        console.log('Materia Prima Creada:', createdMateriaPrima);
        this.dialogRef.close(true);
        this.alertService.success('La Materia Prima ha sido creada exitosamente.', 'Materia Prima Creado');
      },
      error => {
        console.error('Error al crear la materia prima:', error);
        this.alertService.error(`Error al crear la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  private updateMateriaPrima(materiaPrima: MateriaPrima): void {
    this.materiaPrimaService.updateMateriaPrima(materiaPrima.idMateriaPrima, materiaPrima).subscribe(
      () => {
        this.dialogRef.close(true);
        this.alertService.success('La materia prima ha sido actualizada exitosamente.', 'Producto Actualizado');
      },
      error => {
        console.error('Error al actualizar la materia prima:', error);
        this.alertService.error(`Error al actualizar la materia prima: ${error.error.message || error.message}`);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
