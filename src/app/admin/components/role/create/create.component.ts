import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(private roleService: RoleService, private notificationService: NotificationService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner()

    this.roleService.create(name.value,
      () => {
        this.hideSpinner()
        this.createdRole.emit(name.value);
        this.notificationService.showNotification(NotificationType.Success, "Success", "Product Added")
      }, (msg: string) => {
        this.notificationService.showNotification(NotificationType.Error, "Error", msg)
      }
    );
  }
}
