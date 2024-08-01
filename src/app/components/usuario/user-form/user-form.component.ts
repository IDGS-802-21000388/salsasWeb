import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { UsuariosService } from '../../../services/user.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  roles = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'cliente', viewValue: 'Cliente' },
    { value: 'hotel', viewValue: 'Hotel' },
    {value: 'restaurante', viewValue:'Restaurante'}
  ];

  constructor(
    private fb: FormBuilder,
    private UsuariosService: UsuariosService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
      idUsuario: [null],
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      rol: ['', Validators.required],
      estatus: [1, Validators.required],
      telefono: ['', Validators.required],
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
      this.userForm.patchValue(data.user);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const userFormValue = this.userForm.value;
      console.log('Formulario:', userFormValue); // Mostrar el valor del formulario en la consola

      if (this.isEditMode && this.userId !== null) {
        const user: Usuario = { ...userFormValue, idUsuario: this.userId, intentos: 0 };
        console.log('Actualización Usuario:', user); // Mostrar el usuario a actualizar
        this.UsuariosService.updateUser(this.userId, user).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El usuario ha sido actualizado exitosamente.', 'Usuario Actualizado');
        }, error => {
          console.error('Update error:', error);
          this.alertService.error(`Error al actualizar el usuario: ${error.error.message || error.message}`);
        });
      } else {
        const { idUsuario, ...userData } = userFormValue;
        const newUser: Omit<Usuario, 'idUsuario'> = { ...userData, intentos: 0 };
        console.log('Creación Usuario:', newUser); // Mostrar el nuevo usuario a crear
        this.UsuariosService.createUser(newUser as Usuario).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El usuario ha sido creado exitosamente.', 'Usuario Creado');
        }, error => {
          console.error('Create error:', error);
          this.alertService.error(`Error al crear el usuario: ${error.error.message || error.message}`);
        });
      }
    } else {
      console.warn('Formulario inválido:', this.userForm); // Mostrar advertencia de formulario inválido
      this.alertService.error('Por favor, complete todos los campos obligatorios.', 'Formulario Incompleto');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
