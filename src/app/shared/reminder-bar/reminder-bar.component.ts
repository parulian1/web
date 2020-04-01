import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {pipe} from "rxjs";
import {State} from "@app/store/reducers/auth.reducers";
import * as fromEmailReducer from "@app/store/reducers/email.reducer";
import {map} from "rxjs/operators";
import {LocalStorage} from "@app/services/local-storage.service";

@Component({
  selector: 'app-reminder-bar',
  templateUrl: './reminder-bar.component.html',
  styleUrls: ['./reminder-bar.component.scss']
})
export class ReminderBarComponent implements OnInit {
  message: string = '';

  constructor(private localStorage: LocalStorage) {
    if (localStorage.getItem('message')) {
      this.message = localStorage.getItem('message').message;
    }
  }

  ngOnInit(): void {
  }

}
