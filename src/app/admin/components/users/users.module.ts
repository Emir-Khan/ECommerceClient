import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DeleteModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    UsersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: UsersComponent }
    ]),
    DeleteModule,
    MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatButtonModule
  ]
})
export class UsersModule { }
