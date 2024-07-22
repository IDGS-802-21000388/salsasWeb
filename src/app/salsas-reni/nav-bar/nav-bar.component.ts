import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDarkMode = false;
  isSidebarMinimized = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
