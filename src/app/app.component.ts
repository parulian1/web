import {Component, OnInit} from '@angular/core';
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }

  ngOnInit() {

  }


}
