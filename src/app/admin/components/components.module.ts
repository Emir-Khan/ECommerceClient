import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { NotificationModule } from './notification/notification.module';
import { TableListModule } from './table-list/table-list.module';
import { TypographyModule } from './typography/typography.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    UserProfileModule,
    NotificationModule,
    TableListModule,
    TypographyModule
  ]
})
export class ComponentsModule { }
