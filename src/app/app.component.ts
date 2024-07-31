import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ProveedorModule } from './components/proveedor/proveedor.module';
import { SalsasReniModule } from './salsas-reni/salsas-reni.module';
import { ProductoModule } from './components/producto/producto.module';
import { LoginModule } from './components/login/login.module';
import { ComparacionModule } from './components/comparacion/comparacion.module';
import { ProductosMasVendidosModule } from './components/productos-mas-vendidos/productos-mas-vendidos.module';
import { VentasDistribuidasModule } from './components/ventas-distribuidas/ventas-distribuidas.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UsuarioModule } from './components/usuario/usuario.module';



import { LandingPageModule } from './components/landing-page/landing-page.module';
import { FooterModule } from './components/footer/footer.module';
import { MateriaPrimaModule } from './components/materia-prima/materia-prima.module';
import { RecetaModule } from './components/receta/receta.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, ProveedorModule,ProductoModule, SalsasReniModule, ComparacionModule, LoginModule,CommonModule, UsuarioModule],
  imports: [
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    ProveedorModule,
    ProductoModule,
    SalsasReniModule,
    ComparacionModule,
    ProductosMasVendidosModule,
    VentasDistribuidasModule,
    LoginModule,
    LandingPageModule,
    CommonModule,
    FooterModule,
    MateriaPrimaModule,
    RecetaModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
