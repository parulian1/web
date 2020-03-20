import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@app/services/local-storage.service";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {User} from "@app/models/user";
import {VerifyEmail} from "@app/store/actions/email.actions";
import {Observable} from "rxjs";
import {RegisterService} from "@app/services/register.service";
import {map} from "rxjs/operators";
import {AuthenticationService} from "@app/services/auth/authentication.service";
import {Credentials} from "@app/models/credentials";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isEmailVerify: boolean = false;
  user: User = new User();
  currState: any;
  user$: Observable<any>;
  credentials: any;


  constructor(private localStorage: LocalStorage,
              private store: Store<AppState>,
              private service: RegisterService,
              private authService: AuthenticationService) {
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
      this.currState = data;
    });
  }

  ngOnInit() {



  }


}
