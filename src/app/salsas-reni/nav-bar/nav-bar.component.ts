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
          text: 'Producción',
          icon: 'ph-cookie',
          route: '',
          subMenu: [
            { text: 'Inventario', route: '/proveedores' },
            { text: 'Recetas y Galletas', route: '/' },
            { text: 'Producción De Galletas', route: '/produccion-galletas' }
          ]
        },
        {
          text: 'Empleados',
          icon: 'ph-cookie',
          route: '/'
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
        },
      ]
    },
    {
      title: 'Cuenta',
      items: [
        {
          text: 'Cerrar Sesión',
          icon: 'ph-sign-out',
          route: '/logout'
        },
      ]
    },
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
