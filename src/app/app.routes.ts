// app.routes.ts
import { Routes } from '@angular/router';
import { ProviderListComponent } from './components/proveedor/provider-list/provider-list.component';
import { ProviderDetailsComponent } from './components/proveedor/provider-details/provider-details.component';
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
import { PedidosListComponent } from './components/pedidos/pedidos-list/pedidos-list.component';
import { DashboardListComponent } from './components/dashboards/dashboard-list/dashboard-list.component';
import { AuthGuard } from './auth-guard.guard';
import { PuntoVentaComponent } from './components/punto-venta/punto-venta/punto-venta.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { PedidosClienteListComponent } from './components/pedidosCliente/pedidosCliente-list/pedidosCliente-list.component';
import { EstadoInventariosComponent } from './components/etl/estado-inventarios/estado-inventarios.component';
import { ClientesRankingComponent } from './components/etl/clientes-ranking/clientes-ranking.component';
import { VentasComponent } from './components/etl/ventas/ventas.component';
import { DetalleVentaComponent } from './components/detalle-venta/detalle-venta/detalle-venta.component';
import { ComprobanteComponent } from './components/detalle-venta/comprobante/comprobante.component';
import { InformacionNosotrosComponent } from './components/informacion/informacion-nosotros/informacion-nosotros.component';

const noNavBarRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent },
  { path: 'productos', component: PuntoVentaComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'pagoTarjetas', component: DetalleVentaComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado', 'cliente', 'hotel', 'restaurante'] } },
  { path: 'pedidosCliente', component: PedidosClienteListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'cliente', 'hotel', 'restaurante'] } },
  { path: 'comprobante', component: ComprobanteComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'cliente', 'hotel', 'restaurante'] } },
  { path: 'informacion', component: InformacionNosotrosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'cliente', 'hotel', 'restaurante'] } },
];

const navBarRoutes: Routes = [
  { path: 'proveedores', component: ProviderListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'proveedores/details/:id', component: ProviderDetailsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'producto', component: ProductoListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'comparacion', component: ComparacionComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'productoMasVendido', component: ProductosMasVendidosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'ventasDistribuidas', component: VentasDistribuidasComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'MateriaPrima', component: MateriaPrimaListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'compras', component: ComprasListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'recetas', component: RecetaListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'usuarios', component: UserListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'dashboard', component: DashboardListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'estadoInventario', component: EstadoInventariosComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'rankingClientes', component: ClientesRankingComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado'] } },
  { path: 'pedidos', component: PedidosListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado', 'repartidor'] } },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin', 'empleado', 'repartidor'] } },

];

const fallbackRoute: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routes: Routes = [
  ...noNavBarRoutes,
  ...navBarRoutes,
  ...fallbackRoute
];
