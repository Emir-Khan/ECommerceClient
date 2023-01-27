import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { NotificationService, NotificationType } from 'src/app/services/admin/notification.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    const i: HTMLElement = _renderer.createElement("i")
    i.className = "material-icons text-danger"
    i.style.cursor = "pointer"
    i.textContent = "delete"
    _renderer.appendChild(element.nativeElement, i)
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.RunningDots)
      const td: HTMLTableCellElement = this.element.nativeElement
      this.httpClientService.delete({ controller: this.controller }, this.id).subscribe({
        next: result =>
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=75",
            height: "toogle"
          }, 1000, () => {
            this.callback.emit();
            this.notificationService.showNotification(NotificationType.Info, "Info", "Delete Success");
          }),
        error: (errorResponse: HttpErrorResponse) => {
          this.notificationService.showNotification(NotificationType.Error, "Error", "Unknown Error");
          this.spinner.hide(SpinnerType.RunningDots);
        }
      });
    })
  }

  openDialog(afterClosed: () => void): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}

export enum DeleteState {
  Yes,
  No
}
