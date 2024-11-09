import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { FooterModule } from '../footer/footer.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule aquí



@NgModule({
  declarations: [
    PuntoVentaComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    TopBarModule,
    MatDialogModule
  ],
  exports: [
    PuntoVentaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PuntoVentaModule { }
