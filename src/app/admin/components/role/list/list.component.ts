import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListRole } from 'src/app/contracts/role/ListRole';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ["name", "edit", "delete"]
  dataSource: MatTableDataSource<ListRole> = new MatTableDataSource<ListRole>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roleService: RoleService,
    private notificationService: NotificationService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getRoles()
  }


  async getRoles() {
    this.showSpinner();
    const roles: { data: ListRole[],totalRoleCount:number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), errorMessage => this.notificationService.showNotification(NotificationType.Error, "Error", errorMessage))

    this.dataSource = new MatTableDataSource<ListRole>(roles.data);
    this.paginator.length = roles.totalRoleCount;
  }

  async pageChanged() {
    await this.getRoles();
  }
}