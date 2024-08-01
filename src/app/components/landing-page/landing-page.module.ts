import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../footer/footer.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingPageComponent
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
    LandingPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule { }
