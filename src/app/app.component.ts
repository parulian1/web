import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {merge} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';

import {environment} from '@env/environment';
import {Logger, I18nService, untilDestroyed} from '@app/core';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.setTitle();

    log.debug('init');

  }

  setTitle() {
    this.titleService.setTitle('Martha Tilaar Shop');
  }
}
