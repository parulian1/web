import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SocialMediaPage } from '@app/models/social-media';
import { ConfigService } from "@app/core";

/**
 * Returns information about the client that operates this e-commerce storefront.
 */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private appConfigService: ConfigService) {
  }
  /**
   * Returns the displayable name of this e-commerce storefront.
   */
  storeName(): Observable<string> {
    const storeName = this.appConfigService.config.name.substr(0, 1).toUpperCase() +
      this.appConfigService.config.name.substr(1);
    return of(storeName);
  }

  /**
   * Get the clients social media pages.
   */
  socialMediaLinks(): Observable<SocialMediaPage[]> {
    return of([
      {href: 'https://www.instagram.com/marthatilaarshop/?hl=id', type: 'instagram'},
      {href: 'https://twitter.com/MT_Shop?s=20', type: 'twitter'},
      {href: 'https://www.facebook.com/shopmarthatilaar/', type: 'facebook'},
    ]);
  }
}
