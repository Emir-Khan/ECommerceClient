import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:NotificationComponent}
    ])
  ]
})
export class NotificationModule { }
