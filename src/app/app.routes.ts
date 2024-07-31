import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';
import { NavBarComponent } from './salsas-reni/nav-bar/nav-bar.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { LoginComponent } from './components/login/login/login.component';
import { ComparacionComponent } from './components/comparacion/comparacion/comparacion.component';
import { MateriaPrimaListComponent } from './components/materia-prima/materia-prima-list/materia-prima-list.component';
import { RecetaListComponent } from './components/receta/receta-list/receta-list.component';

export const routes: Routes = [
    { path: 'proveedores', component: ProviderListComponent },
    { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
    ///{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: LoginComponent },
    { path: 'productos', component: ProductoListComponent },
    { path: 'home', component: NavBarComponent },

    { path: 'comparacion', component: ComparacionComponent },
    { path: 'MateriaPrima', component: MateriaPrimaListComponent}
    { path: 'recetas', component: RecetaListComponent },
];

