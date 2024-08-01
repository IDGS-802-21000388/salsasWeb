import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';
import { NavBarComponent } from './salsas-reni/nav-bar/nav-bar.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { LoginComponent } from './components/login/login/login.component';
import { ComparacionComponent } from './components/comparacion/comparacion/comparacion.component';
import { UserListComponent } from './components/usuario/user-list/user-list.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { ProductosMasVendidosComponent } from './components/productos-mas-vendidos/productos-mas-vendidos/productos-mas-vendidos.component';
import { VentasDistribuidasComponent } from './components/ventas-distribuidas/ventas-distribuidas/ventas-distribuidas.component';
import { LandingPageComponent } from './components/landing-page/landing-page/landing-page.component';
import { MateriaPrimaListComponent } from './components/materia-prima/materia-prima-list/materia-prima-list.component';
import { RecetaListComponent } from './components/receta/receta-list/receta-list.component';
import { ComprasListComponent } from './components/compras/compras-list/compras-list.component';

const noNavBarRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'landing', component: LandingPageComponent },

];

const navBarRoutes: Routes = [
  { path: 'proveedores', component: ProviderListComponent },
  { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'comparacion', component: ComparacionComponent },
  { path: 'productoMasVendido', component: ProductosMasVendidosComponent },
  { path: 'ventasDistribuidas', component: VentasDistribuidasComponent },
  { path: 'MateriaPrima', component: MateriaPrimaListComponent },
  { path: 'compras', component: ComprasListComponent },
  { path: 'recetas', component: RecetaListComponent },
  {path: 'usuarios', component: UserListComponent},
  {path: 'register', component:RegisterFormComponent},

];

const fallbackRoute: Routes = [
    { path: '**', redirectTo: 'landing', pathMatch: 'full' }
  ];

export const routes: Routes = [
  ...noNavBarRoutes,
  ...navBarRoutes,
  ...fallbackRoute
];
