import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ] ,exports:[
    LoginComponent,
    RegisterFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
