import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { UsuariosService } from '../../../services/user.service';
import { DireccionService } from '../../../services/direccion.service'; 
import { Usuario, Direccion } from '../../../interfaces/usuario';

@Component({
  selector: 'app-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.css']
})
export class DireccionFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  direccionId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private direccionService: DireccionService, 
    private dialogRef: MatDialogRef<DireccionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {
    this.clientForm = this.fb.group({
      direccion: this.fb.group({
        estado: ['', Validators.required],
        municipio: ['', Validators.required],
        codigoPostal: ['', Validators.required],
        colonia: ['', Validators.required],
        calle: ['', Validators.required],
        numExt: ['', Validators.required],
        numInt: [''],
        referencia: ['']
      })
    });

    if (data && data.user) {
      this.isEditMode = true;
      this.userId = data.user.idUsuario;
      this.direccionId = data.user.direccion?.idDireccion || null;
      this.clientForm.patchValue({
        direccion: data.user.direccion
      });
    }
  }

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    if (loggedUser && loggedUser.idUsuario) {
      this.userId = loggedUser.idUsuario;
      if (this.userId !== null && !this.isEditMode) {
        this.loadDireccion(this.userId);
      }
    } else {
      this.alertService.error('No se pudo obtener el usuario logueado.', 'Error de Usuario');
    }
  }

  loadDireccion(userId: number): void {
    this.usuariosService.getUser(userId).subscribe(user => {
      const direccionUsuario = user.direccion;
      if (direccionUsuario) {
        this.direccionId = direccionUsuario.idDireccion;
        this.clientForm.patchValue({ direccion: direccionUsuario });
      }
    }, error => {
      console.error('Error al cargar direcciones:', error);
      this.alertService.error('Error al cargar las direcciones.', 'Error de Dirección');
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const direccion = {
        idDireccion: this.direccionId || 0,
        estado: this.clientForm.get('direccion.estado')?.value,
        municipio: this.clientForm.get('direccion.municipio')?.value,
        codigoPostal: this.clientForm.get('direccion.codigoPostal')?.value,
        colonia: this.clientForm.get('direccion.colonia')?.value,
        calle: this.clientForm.get('direccion.calle')?.value,
        numExt: this.clientForm.get('direccion.numExt')?.value,
        numInt: this.clientForm.get('direccion.numInt')?.value || '',
        referencia: this.clientForm.get('direccion.referencia')?.value || ''
      };

      if (this.direccionId !== null) {
        this.direccionService.updateDireccion(this.direccionId, direccion).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('La dirección ha sido actualizada exitosamente.', 'Dirección Actualizada');
        }, error => {
          console.error('Update error:', error);
          this.alertService.error(`Error al actualizar la dirección: ${error.error.message || error.message}`);
        });
      }
    } else {
      this.alertService.error('Por favor, complete todos los campos obligatorios.', 'Formulario Incompleto');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
