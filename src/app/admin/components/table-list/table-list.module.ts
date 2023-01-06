import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TableListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:TableListComponent}
    ])
  ]
})
export class TableListModule { }
