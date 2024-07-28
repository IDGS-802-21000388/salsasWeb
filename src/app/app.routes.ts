import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { ComparacionComponent } from './components/comparacion/comparacion/comparacion.component';
import { ProductosMasVendidosComponent } from './components/productos-mas-vendidos/productos-mas-vendidos/productos-mas-vendidos.component';
import { VentasDistribuidasComponent } from './components/ventas-distribuidas/ventas-distribuidas/ventas-distribuidas.component';

export const routes: Routes = [
    { path: 'proveedores', component: ProviderListComponent },
    { path: 'proveedores/details/:id', component: ProviderDetailsComponent },
    { path: 'productos', component: ProductoListComponent },
    { path: 'comparacion', component: ComparacionComponent },
    { path: 'productoMasVendido', component: ProductosMasVendidosComponent },
    { path: 'ventasDistribuidas', component: VentasDistribuidasComponent },
];

