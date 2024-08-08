import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { FooterModule } from '../footer/footer.module';
import { TopBarModule } from '../top-bar/top-bar.module';


@NgModule({
  declarations: [
    PuntoVentaComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    TopBarModule
  ],
  exports: [
    PuntoVentaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PuntoVentaModule { }
