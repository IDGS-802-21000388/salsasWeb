import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { ProveedorModule } from './components/proveedor/proveedor.module';
import { SalsasReniModule } from "./salsas-reni/salsas-reni.module";
import { ProductoModule } from './components/producto/producto.module';
import { LoginModule } from './components/login/login.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ComparacionModule } from './components/comparacion/comparacion.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, ProveedorModule,ProductoModule, SalsasReniModule, ComparacionModule, LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarMinimized = false;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
