import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';

import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';

export const routes: Routes = [
    { path: 'proveedores', component: ProviderListComponent },
    { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'productos', component: ProductoListComponent },
];

