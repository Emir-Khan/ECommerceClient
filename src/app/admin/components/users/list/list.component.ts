import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListUser } from 'src/app/contracts/users/list-users';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["userName", "nameSurname", "email", "twoFactorEnabled", "role", "delete"]
  dataSource: MatTableDataSource<ListUser> = new MatTableDataSource<ListUser>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getUsers()
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({ componentType: SelectProductImageDialogComponent, data: id, options: { width: "1120px" } })
  }

  async getUsers() {
    this.showSpinner();
    const users = await this.userService.getAll(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), errorMessage => this.notificationService.showNotification(NotificationType.Error, "Error", errorMessage))
    this.dataSource = new MatTableDataSource<ListUser>(users.users)
    this.paginator.length = users.totalUsersCount;
  }

  async pageChanged() {
    await this.getUsers();
  }

  assignRole(id: string, userName: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: { id, userName },
      afterClosed: () => {
        this.notificationService.showNotification(NotificationType.Success, "Success", "Roles assigned successfully")
      },
    })
  }
}

