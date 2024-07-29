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
    this.loginService.login(this.username, this.password).subscribe(
      (response: Usuario) => {
        console.log('Login successful', response);
       
        this.alertService.success('Inicio de sesión exitoso');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500); 
      },
      error => {
        console.error('Login failed', error);
        
        this.alertService.error('Credenciales inválidas');
      }
    );
  }
}
