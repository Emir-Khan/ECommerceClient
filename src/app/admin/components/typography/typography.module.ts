import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from './typography.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TypographyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: TypographyComponent }
    ])
  ]
})
export class TypographyModule { }
