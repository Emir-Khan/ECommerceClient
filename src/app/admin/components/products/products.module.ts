import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:ProductsComponent}
    ]),
    MatInputModule, MatFormFieldModule
  ]
})
export class ProductsModule { }
