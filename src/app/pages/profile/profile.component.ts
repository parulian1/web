import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentMode: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentMode = 'Sambungkan';

  }

}
