import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../../../services/provider.service';
import { Proveedor } from '../../../interfaces/proveedor';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Proveedor[] = [];
  filteredProviders: Proveedor[] = [];
  displayedColumns: string[] = ['nombreProveedor', 'direccion', 'telefono', 'contacto', 'estado', 'actions'];

  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.providerService.getProviders().subscribe((data: Proveedor[]) => {
      this.providers = data;
      this.filteredProviders = data;
    });
  }

  editProvider(provider: Proveedor): void {
    this.router.navigate(['/proveedores/edit', provider.idProveedor]);
  }

  deleteProvider(provider: Proveedor): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el proveedor ${provider.nombreProveedor}?`)) {
      this.providerService.deleteProvider(provider.idProveedor).subscribe(() => {
        this.loadProviders();
      });
    }
  }

  activateProvider(provider: Proveedor): void {
    if (confirm(`¿Estás seguro de que quieres activar el proveedor ${provider.nombreProveedor}?`)) {
      this.providerService.activateProvider(provider.idProveedor).subscribe(() => {
        this.loadProviders();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProviders = this.providers.filter(provider =>
      provider.nombreProveedor.toLowerCase().includes(filterValue) ||
      provider.direccion.toLowerCase().includes(filterValue) ||
      provider.telefono.toLowerCase().includes(filterValue) ||
      provider.nombreAtiende.toLowerCase().includes(filterValue) ||
      (provider.estatus === 1 ? 'activo' : 'inactivo').toLowerCase().includes(filterValue)
    );
  }
}
