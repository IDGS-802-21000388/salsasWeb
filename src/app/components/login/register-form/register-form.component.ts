import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { EmailService } from '../../../services/email.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  verificationForm: FormGroup;
  verificationCode: string | null = null;
  isVerificationStep = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private alertService: AlertService,
    private emailService: EmailService
  ) {
    this.registerForm = this.fb.group({
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

    this.verificationForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  generateVerificationCode(): string {
    // Genera un código de 6 dígitos
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.verificationCode = this.generateVerificationCode();
      const email = this.registerForm.get('correo')?.value;
      const name = this.registerForm.get('nombre')?.value;

      // Enviar el correo con el código de verificación
      this.emailService.sendVerificationCode(name, 'Your Website Team', email, this.verificationCode)
        .then(() => {
          this.alertService.success('Código de verificación enviado. Por favor, revisa tu correo.', 'Verificación Enviada');
          this.isVerificationStep = true; // Muestra el formulario de verificación
        })
        .catch(error => {
          console.error('Email error:', error);
          this.alertService.error('Error al enviar el código de verificación. Por favor, inténtalo de nuevo.');
        });
    } else {
      this.alertService.error('Por favor, complete todos los campos obligatorios.', 'Formulario Incompleto');
    }
  }

  onVerify() {
    if (this.verificationForm.valid && this.verificationForm.get('code')?.value === this.verificationCode) {
      const formData = this.registerForm.value;
      const { idUsuario, confirmPassword, ...userData } = formData; // Excluir campos no necesarios
      const newUser: Omit<Usuario, 'idUsuario'> = { ...userData, intentos: 0 };

      // Registrar el nuevo usuario
      this.usuariosService.createUser(newUser as Usuario).subscribe(
        () => {
          this.alertService.success('El usuario ha sido registrado exitosamente.', 'Registro Exitoso');
          this.registerForm.reset();
          this.isVerificationStep = false; // Oculta el formulario de verificación
          this.verificationCode = null; // Resetea el código de verificación
        },
        error => {
          console.error('Create error:', error);
          this.alertService.error(`Error al registrar el usuario: ${error.error.message || error.message}`);
        }
      );
    } else {
      this.alertService.error('Código de verificación incorrecto. Por favor, inténtalo de nuevo.', 'Verificación Fallida');
    }
  }
}
