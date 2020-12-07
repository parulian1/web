import {Component} from '@angular/core';


/**
 * A 'soft'-404 page.  This should be displayed to the user whenever the page
 * they are attempting to visit doesn't exist.
 *
 * Note: technically google frowns upon this, and we should be redirecting
 * to a separate page (generated from the server), which generates a 404.
 */
@Component({
  selector: 'app-not-found',
  template: `
    <div class="container">
      <img src="./../../../assets/404.png" />
      <span>Maaf, halaman yang Anda cari tidak ada</span>
      <a [routerLink]="['/']">Balik ke Beranda</a>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor() {
  }
}
