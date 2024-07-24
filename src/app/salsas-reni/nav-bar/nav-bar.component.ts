import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isSidebarActive = false;
  activeMenuIndex: number | null = null;
  activeSubMenuIndex: number | null = null;

  menus = [
    {
      title: 'Main',
      items: [
        {
          text: 'Producción',
          icon: 'ph-cookie',
          subMenu: [
            { text: 'Inventario' },
            { text: 'Recetas y Galletas' },
            { text: 'Producción De Galletas' }
          ]
        },
        {
          text: 'Empleados',
          icon: 'ph-cookie',

        }
      ]
    },
    {
      title: 'Seguridad',
      items: [
        {
          text: 'Producción',
          icon: 'ph-cookie',
          subMenu: [
            { text: 'Inventario' },
            { text: 'Recetas y Galletas' },
            { text: 'Producción De Galletas' }
          ]
        },
      ]
    },
    {
      title: 'Cuenta',
      items: [
        {
          text: 'Cerrar Sesion',
          icon: 'ph-cookie'
        },
      ]
    },
  ];

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
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
