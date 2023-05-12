import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DeleteModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    RoleComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: RoleComponent }
    ]),
    DeleteModule,
    MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatButtonModule
  ]
})
export class RoleModule { }
