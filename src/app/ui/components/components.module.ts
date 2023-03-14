import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    ProductsModule,
    OrdersModule
  ]
})
export class ComponentsModule { }
