import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerTypeName: SpinnerType = SpinnerType.RunningDots) {
    this.spinner.show(spinnerTypeName)
    setTimeout(() => {
      this.hideSpinner(spinnerTypeName);
    }, 10000);
  }

  hideSpinner(spinnerTypeName: SpinnerType = SpinnerType.RunningDots) {
    this.spinner.hide(spinnerTypeName)
  }
}

export enum SpinnerType {
  RunningDots = "s1"
}
