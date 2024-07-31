import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule,Router } from '@angular/router';
import { ProveedorModule } from './components/proveedor/proveedor.module';
import { SalsasReniModule } from "./salsas-reni/salsas-reni.module";
import { ProductoModule } from './components/producto/producto.module';
import { LoginModule } from './components/login/login.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ComparacionModule } from './components/comparacion/comparacion.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UsuarioModule } from './components/usuario/usuario.module';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, ProveedorModule,ProductoModule, SalsasReniModule, ComparacionModule, LoginModule,CommonModule, UsuarioModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
  isSidebarMinimized = false;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }

  isLoginPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/' || currentUrl === '/register';
  }
}

