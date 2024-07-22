import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalsasReniModule } from "./salsas-reni/salsas-reni.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SalsasReniModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarMinimized = false;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}
