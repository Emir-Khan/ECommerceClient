import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { NotificationModule } from './notification/notification.module';
import { TableListModule } from './table-list/table-list.module';
import { TypographyModule } from './typography/typography.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    UserProfileModule,
    NotificationModule,
    TableListModule,
    TypographyModule,
    ProductsModule,
    OrdersModule,
    AuthorizeMenuModule,
    RoleModule,
    UsersModule
  ]
})
export class ComponentsModule { }
