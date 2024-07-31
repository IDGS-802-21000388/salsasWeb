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

export const routes: Routes = [
    { path: 'proveedores', component: ProviderListComponent },
    { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
    { path: '', component: LoginComponent },
    {path: 'register', component:RegisterFormComponent},
    { path: 'productos', component: ProductoListComponent },
    { path: 'home', component: NavBarComponent },

    { path: 'comparacion', component: ComparacionComponent },
    {path: 'usuarios', component: UserListComponent}
    { path: 'productoMasVendido', component: ProductosMasVendidosComponent },
    { path: 'ventasDistribuidas', component: VentasDistribuidasComponent },
    { path: 'lading', component: LandingPageComponent },
    { path: 'MateriaPrima', component: MateriaPrimaListComponent},
    { path: 'recetas', component: RecetaListComponent },
];

