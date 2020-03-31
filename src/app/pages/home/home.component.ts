import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@app/services/local-storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {AuthUserService} from "@app/services/auth-user.service";
import {CredentialsService} from "@app/core/authentication/credentials.service";
import {VerifyEmail} from "@app/store/actions/email.actions";
import {pipe} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localStorage: LocalStorage,
              private store: Store<AppState>,
              private service: AuthUserService,
              private creds: CredentialsService) {

  }

  ngOnInit() {
    console.log('isAuthenticated',this.creds.isAuthenticated());
  }

}
