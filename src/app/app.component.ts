import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentRoute: string;

  constructor(private spinner: NgxSpinnerService, private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.spinner.show(SpinnerType.RunningDots);

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide(SpinnerType.RunningDots);
        }, 1000);
      }
    })
  }
  ngOnInit() {
    /** spinner starts on init */

  }

  title = 'ETicaretClient';
}
