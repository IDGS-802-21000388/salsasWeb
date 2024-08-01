import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProveedorModule } from './components/proveedor/proveedor.module';
import { SalsasReniModule } from './salsas-reni/salsas-reni.module';
import { ProductoModule } from './components/producto/producto.module';
import { LoginModule } from './components/login/login.module';
import { ComparacionModule } from './components/comparacion/comparacion.module';
import { ProductosMasVendidosModule } from './components/productos-mas-vendidos/productos-mas-vendidos.module';
import { VentasDistribuidasModule } from './components/ventas-distribuidas/ventas-distribuidas.module';
import { CommonModule } from '@angular/common';
import { UsuarioModule } from './components/usuario/usuario.module';
import { LandingPageModule } from './components/landing-page/landing-page.module';
import { FooterModule } from './components/footer/footer.module';
import { MateriaPrimaModule } from './components/materia-prima/materia-prima.module';
import { RecetaModule } from './components/receta/receta.module';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartModule } from './components/cart/cart.module';

@Component({
  selector: 'app-root',
  standalone: true,
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
    UsuarioModule,
    LandingPageModule,
    CommonModule,
    FooterModule,
    MateriaPrimaModule,
    RecetaModule,
    TopBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CartModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isNavBarVisible(): boolean {
    const hiddenRoutes = ['/', '/landing', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
