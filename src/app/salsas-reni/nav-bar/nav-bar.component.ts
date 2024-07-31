import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isSidebarActive = true;
  activeMenuIndex: number | null = null;
  activeSubMenuIndex: number | null = null;

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
            { text: 'Compras', route: '/' },
            { text: 'Productos', route: '/productos' }
          ]
        },
        {
          text: 'Personal',
          icon: 'ph-cookie',
          route: '',
          subMenu: [
            { text: 'Empleados', route: '/' },
            { text: 'Proveedores', route: '/proveedores' },
            { text: 'Clientes', route: '/' }
          ]
        }
      ]
    },
    {
      title: 'Seguridad',
      items: [
        {
          text: 'Seguridad',
          icon: 'ph-lock',
          route: '/seguridad',
          subMenu: [
            { text: 'Roles', route: '/roles' },
            { text: 'Permisos', route: '/permisos' }
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
          route: '/logout',
          subMenu: [] // Añadir subMenu vacío
        }
      ]
    }
  ];  

  // Abre la barra de navegación cuando el cursor está sobre ella
  onMouseEnter() {
    this.isSidebarActive = false;
  }

  // Cierra la barra de navegación cuando el cursor sale de ella
  onMouseLeave() {
    this.isSidebarActive = true;
  }

  toggleSubMenu(menuIndex: number, subMenuIndex: number) {
    if (this.activeMenuIndex === menuIndex && this.activeSubMenuIndex === subMenuIndex) {
      this.activeSubMenuIndex = null;
    } else {
      this.activeMenuIndex = menuIndex;
      this.activeSubMenuIndex = subMenuIndex;
    }
  }
}
