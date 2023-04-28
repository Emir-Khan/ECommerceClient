import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    ProductsModule,
    OrdersModule,
    UpdatePasswordModule
  ]
})
export class ComponentsModule { }
