import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from '../../../services/provider.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  providerForm: FormGroup;
  isEditMode = false;
  providerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private dialogRef: MatDialogRef<ProviderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {
    this.providerForm = this.fb.group({
      idProveedor: [null],
      nombreProveedor: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreAtiende: ['', Validators.required],
      estatus: [1, Validators.required]
    });

    if (data && data.provider) {
      this.isEditMode = true;
      this.providerId = data.provider.idProveedor;
      this.providerForm.patchValue(data.provider);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.providerForm.valid) {
      const provider: Proveedor = this.providerForm.value;
      if (this.isEditMode && this.providerId !== null) {
        this.providerService.updateProvider(this.providerId, provider).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El proveedor ha sido actualizado exitosamente.', 'Proveedor Actualizado');
        }, error => {
          console.error('Update error:', error);
          this.alertService.error(`Error al actualizar el proveedor: ${error.error.message || error.message}`);
        });
      } else {
        const { idProveedor, ...providerData } = provider;
        this.providerService.createProvider(providerData as Proveedor).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El proveedor ha sido creado exitosamente.', 'Proveedor Creado');
        }, error => {
          console.error('Create error:', error);
          this.alertService.error(`Error al crear el proveedor: ${error.error.message || error.message}`);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
