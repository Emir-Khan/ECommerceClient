import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {path:"",component:UserProfileComponent}
    ])
  ]
})
export class UserProfileModule { }
