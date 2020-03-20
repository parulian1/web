import { Component, OnInit } from '@angular/core';
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {Logout} from "@app/store/actions/auth.actions";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
