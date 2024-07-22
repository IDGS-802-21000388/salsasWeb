import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderFormComponent } from './components/proveedor/provider-form/provider-form.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';

export const routes: Routes = [
    { path: 'proveedores/list', component: ProviderListComponent },
    { path: 'proveedores/create', component: ProviderFormComponent },
    { path: 'proveedores/edit/:id', component: ProviderFormComponent },
    { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
];

