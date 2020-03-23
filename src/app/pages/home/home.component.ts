import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@app/services/local-storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {RegisterService} from "@app/services/register.service";
import {AuthenticationService} from "@app/services/auth/authentication.service";
import {VerifyEmail} from "@app/store/actions/email.actions";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localStorage: LocalStorage,
              private store: Store<AppState>,
              private service: RegisterService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    console.log(this.authService.isAuthenticated());

  }

  verifyEmail() {
    // const payload = {
    //   email: this.authService.credentials.payload.email,
    // };
    //
    // this.store.dispatch(new VerifyEmail(payload));

   this.service.sendVerifyEmail(this.authService.credentials.payload.email)
     .subscribe(res => {
       console.log('verify', res);
     })
  }


}
