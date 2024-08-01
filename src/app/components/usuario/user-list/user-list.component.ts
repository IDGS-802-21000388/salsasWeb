import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../../../services/alert.service';
import { UsuariosService } from '../../../services/user.service';
import { Usuario } from '../../../interfaces/usuario';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'direccion', 'telefono', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private UsuariosService: UsuariosService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.UsuariosService.getUsers().subscribe((data: Usuario[]) => {
      this.usuarios = data;
      this.dataSource.data = this.usuarios;
    });
  }

  editUser(user: Usuario): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadUsers();
        this.alertService.success('El usuario ha sido actualizado exitosamente.', 'Usuario Actualizado');
      }
    });
  }

  deleteUser(user: Usuario): void {
    this.alertService.confirm(`¿Estás seguro de que quieres eliminar el usaurio ${user.nombre}?`).then((result) => {
      if (result.isConfirmed) {
        this.UsuariosService.deleteUser(user.idUsuario).subscribe(() => {
          this.loadUsers();
          this.alertService.success('El usuario ha sido eliminado.', 'Eliminado');
        }, error => {
          this.alertService.error(`Error al eliminar el usuario: ${error.error.message || error.message}`);
        });
      }
    });
  }

  activateUser(user: Usuario): void {
    this.alertService.confirm(`¿Estás seguro de que quieres activar el usaurio ${user.nombre}?`).then((result) => {
      if (result.isConfirmed) {
        this.UsuariosService.activateUser(user.idUsuario).subscribe(() => {
          this.loadUsers();
          this.alertService.success('El usaurio ha sido activado.', 'Activado');
        }, error => {
          this.alertService.error(`Error al activar el usuario: ${error.error.message || error.message}`);
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  createUser(): void {
    this.isModalOpen = true;
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isModalOpen = false;
      if (result) {
        this.loadUsers();
        this.alertService.success('El usuario ha sido creado exitosamente.', 'Usuario Creado');
      }
    });
  }
}


