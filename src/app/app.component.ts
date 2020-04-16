import {Component, OnInit} from '@angular/core';
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private title: Title) {
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }

  ngOnInit() {
    this.title.setTitle('Martha Tilaar Shop');
  }


}
