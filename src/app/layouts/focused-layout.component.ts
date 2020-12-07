import { Component } from '@angular/core';

/**
 * A special header-type used within checkouts, where the user should
 * only be presented with the site's logo in the app header (i.e., search,
 * navbar, profile components should all be hidden) for pages like
 * checkout.
 */
@Component({
  selector: 'app-focused-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class FocusedLayoutComponent {
  constructor() { }
}


