import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(private roleService: RoleService, private notificationService: NotificationService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    document.getElementById("roleName")?.focus(); 
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(input: HTMLInputElement) {
    this.showSpinner()
    const name = input.value;

    this.roleService.create(name,
      () => {
        this.hideSpinner()
        this.createdRole.emit(name);
        input.value = "Admin - ";
        // focus on the input
        input.focus();
        this.notificationService.showNotification(NotificationType.Success, "Success", "Product Added")
      }, (msg: string) => {
        this.notificationService.showNotification(NotificationType.Error, "Error", msg)
      }
    );
  }
}
