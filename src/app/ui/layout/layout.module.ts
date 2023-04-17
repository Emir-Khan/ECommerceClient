import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { DynamicComponentLoaderDirective } from 'src/app/directives/common/dynamic-component-loader.directive';



@NgModule({
  declarations: [
    LayoutComponent,
    DynamicComponentLoaderDirective
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class LayoutModule { }
