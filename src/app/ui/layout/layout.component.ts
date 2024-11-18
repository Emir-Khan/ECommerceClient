import { Component, ViewChild } from '@angular/core';
import { UserDetail } from 'src/app/models/user-detail';
import { DynamicComponentLoaderDirective } from 'src/app/directives/common/dynamic-component-loader.directive';
import { AuthService } from 'src/app/services/common/auth.service';
import { DynamicComponent, DynamicComponentLoaderService } from 'src/app/services/common/dynamic-component-loader.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/states/user/app.state';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/states/user/app.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicLoadComponentDirective: DynamicComponentLoaderDirective;
  user: Observable<UserDetail> | null = this.store.pipe(select(selectUser));

  constructor(private store: Store<AppState>, public userService: UserService, public authService: AuthService,
    private dynamicComponentLoaderService: DynamicComponentLoaderService) { }

  async loadComponent() {
    await this.dynamicComponentLoaderService.loadComponent(DynamicComponent.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }

}
