import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { GetRolesResponse } from 'src/app/contracts/role/get-roles-response';
import { MatListOption } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {

  roles: GetRolesResponse
  endpointRoles: string[] = [];
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: string, definition: string, menuName: string },
    private roleService: RoleService, private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService) {
    super(dialogRef);
  }

  async ngOnInit() {
    this.endpointRoles = await this.authorizationEndpointService.getEndpointRoles(this.data.code, this.data.menuName, () => { }, () => { })
    this.roles = await this.roleService.getRoles(-1, -1);
  }

  assignRoles(selectedRoles: MatListOption[]) {
    this.spinner.show(SpinnerType.RunningDots);

    const roles = selectedRoles.map(role => role.value.name)
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.menuName, () => { this.spinner.hide(SpinnerType.RunningDots); })
  }

  isRoleExist(roleName: string): boolean {
    return this.endpointRoles?.includes(roleName);
  }
}
export enum AuthorizeMenuState {
  Yes,
  No
}
