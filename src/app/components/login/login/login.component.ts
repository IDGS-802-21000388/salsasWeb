import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../interfaces/usuario';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) {}

  onLogin() {
    console.log('Attempting login with', this.username, this.password);

    this.loginService.login(this.username, this.password).subscribe(
      (response: any) => {  // Cambia el tipo de 'response' a 'any'
        console.log('Login successful', response);

        // Extraer el objeto de usuario de la respuesta
        const user: Usuario = response.user;
     
        localStorage.setItem('loggedUser', JSON.stringify(user));

        this.alertService.success('Inicio de sesión exitoso', 'Acceso Permitido');
        setTimeout(() => {
          if (user.rol === 'admin' || user.rol === 'empleado' || user.rol === 'repartidor') {
            this.router.navigate(['/inicio']);
          } else {
            this.router.navigate(['/']);
          }
        }, 1500);
      },
      error => {
        console.error('Login failed', error);
        this.alertService.error('Credenciales inválidas', 'Acceso Denegado');
      }
    );
  }
}
