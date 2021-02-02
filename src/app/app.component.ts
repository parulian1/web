import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {SubscriptionLike} from 'rxjs';

import {AuthenticationService, CredentialsService} from '@app/core/authentication';
import {AppState} from '@app/store/state/app.state';
import {AuthUserService} from '@app/services';
import {Logout} from '@app/store/actions';
import {environment} from '@env/environment.prod';
import {ConfigService, Logger} from '@app/core';
import {Configuration} from '@app/models';
import {GtagService} from '@app/library/gtagjs/gtag.service';


declare let fbq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private static FIVE_MINUTES = 1000 * 60 * 5;

  isBusy = false;
  config: Configuration;
  private routerEventsSub: SubscriptionLike;
  private timer;

  constructor(private store: Store<AppState>,
              private title: Title,
              private router: Router,
              private authService: AuthenticationService,
              private credentialsService: CredentialsService,
              private service: AuthUserService,
              private appConfigService: ConfigService,
              @Inject(PLATFORM_ID) private platformId: any,
              @Inject(DOCUMENT) private document: Document,
              private renderer2: Renderer2,
              private meta: Meta,
              private gtag: GtagService) {
  }

  ngOnInit() {
    this.config = this.appConfigService.config;
    let title = 'Nusantara Platform';
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    if (!!this.config?.tagLine) {
      title += this.config.tagLine.substr(0, 1).toUpperCase() + this.config.tagLine.substr(1);
    }
    this.title.setTitle(title);
    this.addFavIcon();
    this.addSeoMeta();

    if (isPlatformBrowser(this.platformId)) {
      this.startRefreshTokenCheck();
      this.startNavigationChangeListener();

      this.appConfigService.loadChatService(
        this.renderer2, this.document, this.config,
      )
    }

    if (environment.production) {
      Logger.enableProductionMode();
    }

  }

  ngOnDestroy() {
    if (isPlatformBrowser((this.platformId))) {
      clearInterval(this.timer);
      this.routerEventsSub.unsubscribe();
    }
  }

  /**
   * Starts a timer that checks every 5 minutes if the user's token is expired,
   * and refreshes it if necessary.
   */
  startRefreshTokenCheck() {
    this.timer = setInterval(() => {
      if (this.credentialsService.shouldRefreshToken) {
        this.service.refreshToken(this.credentialsService.refreshToken).subscribe(
          resp => resp,
          error => this.store.dispatch(new Logout()));
      }
    }, AppComponent.FIVE_MINUTES);
  }

  /**
   * Begins listening for navigation events -- primarily so that the user's
   * current scroll position can be reset to the top of the page when they
   * change pages.
   */
  startNavigationChangeListener() {
    this.routerEventsSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.onNavigationStarted();
      } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.onNavigationEnded();
        this.getSlugToAnalytics(e);
      }
    });
  }

  onNavigationStarted() {
    window.scrollTo(0, 0);
    this.isBusy = true;
  }

  onNavigationEnded() {
    this.isBusy = false;
  }

  getSlugToAnalytics(e: NavigationEnd | NavigationCancel | NavigationError) {
    if (e instanceof NavigationEnd) {
      // gtag('config', 'UA-17290976-18', {'page_path': e.urlAfterRedirects});
      // this.gtag.pageView();
      fbq('track', 'PageView');
    }
  }

  private loadScript(url: string, id: string = '') {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      if (id !== '') {
        script.id = id;
      }
      console.log('script', script);
      this.renderer2.appendChild(this.document.body, script);
    })
  }

  private addFavIcon() {
    const defaultFavIco = 'assets/favicon.ico';
    let iconLinkElement = document.createElement('link');
    let shorCutIconlinkElement = document.createElement('link');
    iconLinkElement.setAttribute('rel', 'icon');
    iconLinkElement.setAttribute('type', 'image/x-icon');
    shorCutIconlinkElement.setAttribute('rel', 'shortcut icon');
    shorCutIconlinkElement.setAttribute('type', 'image/x-icon');

    if (!!this.config?.favicon) {
      iconLinkElement.setAttribute('href', this.config.favicon);
      shorCutIconlinkElement.setAttribute('href', this.config.favicon);
    } else {
      iconLinkElement.setAttribute('href', defaultFavIco);
      shorCutIconlinkElement.setAttribute('href', defaultFavIco);
    }
    document.head.appendChild(iconLinkElement);
    document.head.appendChild(shorCutIconlinkElement);
  }

  private addSeoMeta() {
    if (!!this.config?.extraConfig?.description) {
      this.meta.addTag({
        name: 'description', content: this.config.extraConfig.description
      });
    }
    if (!!this.config?.extraConfig?.keywords) {
      this.meta.addTag({
        name: 'keywords', content: this.config.extraConfig.keywords
      });
    }
  }
}
