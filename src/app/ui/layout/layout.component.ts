import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicComponentLoaderDirective } from 'src/app/directives/common/dynamic-component-loader.directive';
import { AuthService } from 'src/app/services/common/auth.service';
import { DynamicComponent, DynamicComponentLoaderService } from 'src/app/services/common/dynamic-component-loader.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicLoadComponentDirective: DynamicComponentLoaderDirective;

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router,
    private dynamicComponentLoaderService: DynamicComponentLoaderService) {
    authService.identityCheck()
  }

  async loadComponent() {    
    await this.dynamicComponentLoaderService.loadComponent(DynamicComponent.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef);

  }

}
