import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/base.component';
import { UserService } from './services/common/models/user.service';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentRoute: string;

  constructor(private spinner: NgxSpinnerService, private router: Router, public userService: UserService, public authService: AuthService) {
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

  async ngOnInit() {
    this.authService.identityCheck();
    if (this.authService.isAuthenticated)
      await this.userService.getMe();
  }

  title = 'ETicaretClient';
}
