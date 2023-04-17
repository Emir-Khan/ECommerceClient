import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BasketModule } from './basket/basket.module';
import { BasketComponent } from './basket/basket.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BasketModule
  ],
  exports:[
    HeaderComponent,
    BasketComponent
  ]
})
export class ComponentsModule { }
