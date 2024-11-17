import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApplicationService } from 'src/app/services/common/models/application.service';
import { Menu } from 'src/app/contracts/app-configuration/menu';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent implements OnInit {
  dataSource: Menu[];
  constructor(private applicationService: ApplicationService, private dialogService: DialogService) { }

  async ngOnInit() {
    this.dataSource = await this.applicationService.getAuthorizeDefinitionEndpoints();
  }
  assignRole(code: string, definition: string, menuName: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code, definition, menuName }
    })
  }
}

