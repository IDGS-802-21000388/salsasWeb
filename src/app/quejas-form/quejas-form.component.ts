import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuejasService } from '../services/quejas.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-quejas-form',
  templateUrl: './quejas-form.component.html',
  styleUrls: ['./quejas-form.component.css']
})
export class QuejasFormComponent {
  quejaForm: FormGroup;
  forbiddenChars = /[<>/'"%;()&+]/; // Expresión regular para caracteres no permitidos

  constructor(
    private fb: FormBuilder,
    private quejasService: QuejasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.quejaForm = this.fb.group({
      contenido: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.pattern(`^[^<>/'"%;&()+]*$`) // Valida caracteres no permitidos
        ]
      ],
      idUsuario: [''], // Se configurará automáticamente
      Estado: ['Nueva'],
    });

    this.setUserId();
  }

  setUserId() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.quejaForm.get('idUsuario')?.setValue(userId);
    } else {
      alert('Error: No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      console.error('Usuario no autenticado o campo idUsuario no encontrado en localStorage');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.quejaForm.valid) {
      this.quejasService.crearQueja(this.quejaForm.value).subscribe({
        next: () => {
          alert('Queja enviada exitosamente');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Error al enviar la queja');
          console.error(err);
        }
      });
    } else {
      alert('El contenido contiene caracteres no permitidos.');
    }
  }
}
