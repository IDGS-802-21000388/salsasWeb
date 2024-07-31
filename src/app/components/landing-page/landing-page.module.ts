import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../footer/footer.module';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    FooterModule
  ],
  exports: [
    LandingPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule { }
