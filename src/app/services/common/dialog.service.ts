import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameter: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameter.componentType, {
      width: dialogParameter.options?.width,
      height: dialogParameter.options?.height,
      position: dialogParameter.options?.position,
      data: dialogParameter.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result == dialogParameter.data) {
        dialogParameter.afterClosed();
      }
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<any>
  data: any
  afterClosed: () => void;
  options: Partial<DialogOptions> = new DialogOptions()
}

export class DialogOptions {
  width?: string = "250px"
  height?: string
  position?: Partial<DialogPosition>
}