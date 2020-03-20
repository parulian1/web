import {Component, Input, OnInit} from '@angular/core';
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {AuthFacebook} from "@app/store/actions/auth.actions";
import {environment} from "@env/environment";

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent implements OnInit {
  @Input()
  public currentMode: String;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

  }

  authFb() {
    // this.store.dispatch(new AuthFacebook())
  }

}
