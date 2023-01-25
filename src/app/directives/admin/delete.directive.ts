import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
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
  @Output() callback: EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.RunningDots)
      const td: HTMLTableCellElement = this.element.nativeElement
      await this.productService.delete(this.id);

      $(td.parentElement).fadeOut(1500, () => this.callback.emit())
    })
  }

  openDialog(afterClosed: () => void): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result ==DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}

export enum DeleteState {
  Yes,
  No
}
