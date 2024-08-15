import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isSidebarActive = true;
  activeMenuIndex: number | null = null;
  activeSubMenuIndex: number | null = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  nombre: string = '';
  rol: string = '';

  ngOnInit() {
    const loggedUser = localStorage.getItem('loggedUser');
    let nombre =""; 
    let rol ="";
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      
      this.nombre = user.nombre;
      rol = user.rol;
      if (rol === "admin"){
        this.rol = "Administrador"
      }
    }
  }

  menus = [
    {
      title: 'Main',
      items: [
        {
          text: 'Inventario',
          icon: 'ph-cookie',
          route: '',
          subMenu: [
            { text: 'Materia Prima', route: '/MateriaPrima' },
            { text: 'Compras', route: '/compras' },
            { text: 'Productos', route: '/recetas' }
          ]
        },
        {
          text: 'Personal',
          icon: 'ph-users',
          route: '',
          subMenu: [
            { text: 'Usuarios', route: '/usuarios' },
            { text: 'Proveedores', route: '/proveedores' }
          ]
        },
        {
          text: 'Dashboard',
          icon: 'ph-money',
          route: '',
          subMenu: [
            { text: 'General', route: '/dashboard' },
            { text: 'Comparacion', route: '/comparacion' },
            { text: 'Pedidos', route: '/pedidos' }
          ]
        },
        {
          text: 'ETL',
          icon: 'ph-database',
          route: '',
          subMenu: [
            { text: 'Estado de Inventarios', route: '/estadoInventario' },
            { text: 'Ventas', route: '/ventas' },
            { text: 'Ranking de Clientes', route: '/rankingClientes' }
          ]
        }
      ]
    },
    {
      title: 'Cuenta',
      items: [
        {
          text: 'Cerrar Sesión',
          icon: 'ph-sign-out',
          route: '',
          subMenu: [] // Añadir subMenu vacío
        }
      ]
    }
  ];

  // Abre la barra de navegación cuando el cursor está sobre ella
  onMouseEnter() {
    this.isSidebarActive = false;
  }

  // Cierra la barra de navegación y el submenú cuando el cursor sale de ella
  onMouseLeave() {
    this.isSidebarActive = true;
    this.activeMenuIndex = null;
    this.activeSubMenuIndex = null;
  }

  toggleSubMenu(menuIndex: number, subMenuIndex: number) {
    if (this.activeMenuIndex === menuIndex && this.activeSubMenuIndex === subMenuIndex) {
      this.activeSubMenuIndex = null;
    } else {
      this.activeMenuIndex = menuIndex;
      this.activeSubMenuIndex = subMenuIndex;
    }
  }

  logout() {
    this.authService.logout();
    this.alertService.success('Has cerrado sesión correctamente.', 'Sesión cerrada');
    this.router.navigate(['/']);
  }
}
