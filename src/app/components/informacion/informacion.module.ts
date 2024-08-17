import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionNosotrosComponent } from './informacion-nosotros/informacion-nosotros.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FooterModule } from '../footer/footer.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InformacionNosotrosComponent
  ],
  imports: [
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    FooterModule,
    TopBarModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [
    InformacionNosotrosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformacionModule { }
