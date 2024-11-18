import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { NotificationService, NotificationType } from '../../admin/notification.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  constructor(
    private httpClientService: HttpClientService,
    private notificationService: NotificationService,
    private toastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData: FormData = new FormData();
    for (const selectedFile of files) {
      if (selectedFile.fileEntry.isFile) {
        (selectedFile.fileEntry as FileSystemFileEntry).file((realFile: File) => {
          formData.append(realFile.name, realFile, selectedFile.relativePath)
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = selectedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.RunningDots);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          // headers: new HttpHeaders({ "responseType": "blob" })
        }, formData).subscribe({
          next: data => {
            const msg = "File Upload Success"
            if (this.options.isAdminPage)
              this.notificationService.showNotification(NotificationType.Success, "Success", msg)
            else
              this.toastrService.message(msg, "Success", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight })
            this.spinner.hide(SpinnerType.RunningDots);
          }, error: (errorResponse: HttpErrorResponse) => {
            const msg = "File Upload Failed"
            if (this.options.isAdminPage)
              this.notificationService.showNotification(NotificationType.Error, "Error", msg)
            else
              this.toastrService.message(msg, "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomRight })
            this.spinner.hide(SpinnerType.RunningDots);
          }
        })

      }
    })
    // this.openDialog(() => {
    //   this.httpClientService.post({
    //     controller: this.options.controller,
    //     action: this.options.action,
    //     queryString: this.options.queryString,
    //     // headers: new HttpHeaders({ "responseType": "blob" })
    //   }, formData).subscribe({
    //     next: data => {
    //       const msg = "File Upload Success"
    //       if (this.options.isAdminPage)
    //         this.notificationService.showNotification(NotificationType.Success, "Success", msg)
    //       else
    //         this.toastrService.message(msg, "Success", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight })
    //     }, error: (errorResponse: HttpErrorResponse) => {
    //       const msg = "File Upload Failed"
    //       if (this.options.isAdminPage)
    //         this.notificationService.showNotification(NotificationType.Error, "Error", msg)
    //       else
    //         this.toastrService.message(msg, "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomRight })
    //     }
    //   })

    // })
  }

  // openDialog(afterClosed: () => void): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}

export class FileUploadOptions {
  controller?: string
  action?: string
  queryString?: string
  explanation?: string
  accept?: string
  headers?: HttpHeaders
  isAdminPage?: boolean = false;
}

export enum FileUploadDialogState {
  Yes, No
}