import {Component} from '@angular/core';

/**
 * The main application layout which shows the search bar, nav-links and profile/auth
 * controls in the header.  Social media, and various user-configurable links are
 * displayed in the app footer.
 */
@Component({
  selector: 'app-main-layout',
  template: `
    <header>
      <app-header></app-header>
    </header>
    <div>
      <router-outlet (activate)="onActivate($event)"></router-outlet>
    </div>
    <footer>
      <app-social-media></app-social-media>
      <app-footer></app-footer>
      <app-copyright></app-copyright>
    </footer>
  `,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor() {
  }

  onActivate($event: any) {
    window.scroll(0, 0);
  }
}
