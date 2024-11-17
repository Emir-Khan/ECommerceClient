import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/contracts/users/user-detail';
import { DynamicComponentLoaderDirective } from 'src/app/directives/common/dynamic-component-loader.directive';
import { AuthService } from 'src/app/services/common/auth.service';
import { DynamicComponent, DynamicComponentLoaderService } from 'src/app/services/common/dynamic-component-loader.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicLoadComponentDirective: DynamicComponentLoaderDirective;
  user: UserDetail | null = null;

  constructor(public userService: UserService, public authService: AuthService, private toastrService: CustomToastrService, private router: Router,
    private dynamicComponentLoaderService: DynamicComponentLoaderService) {

  }
  async ngOnInit(): Promise<void> {
    this.authService.identityCheck();
    if (this.authService.isAuthenticated)
      this.user = await this.userService.getMe();
  }

  async loadComponent() {
    await this.dynamicComponentLoaderService.loadComponent(DynamicComponent.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }

}
