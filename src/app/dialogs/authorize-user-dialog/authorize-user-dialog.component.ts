import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { GetRolesResponse } from 'src/app/contracts/role/get-roles-response';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  roles: GetRolesResponse
  endpointRoles: string[] = [];
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, userName: string },
    private roleService: RoleService, private userService: UserService,
    private spinner: NgxSpinnerService) {
    super(dialogRef);
  }

  async ngOnInit() {
    this.spinner.show(SpinnerType.RunningDots);
    this.endpointRoles = await this.userService.getUserRoles(this.data.id, () => this.spinner.hide(SpinnerType.RunningDots))
    this.roles = await this.roleService.getRoles(-1, -1);
  }

  assignRoles(selectedRoles: MatListOption[]) {
    this.spinner.show(SpinnerType.RunningDots);
    const roles = selectedRoles.map(role => role.value.name)
    console.log(this.data, roles);

    this.userService.assignRoleToUser(this.data.id, roles, () => this.spinner.hide(SpinnerType.RunningDots))
  }

  isRoleExist(roleName: string): boolean {
    return this.endpointRoles?.includes(roleName);
  }
}