import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SocialMediaPage } from '@app/models/social-media';

/**
 * Returns information about the client that operates this e-commerce storefront.
 */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /**
   * Returns the displayable name of this e-commerce storefront.
   */
  storeName(): Observable<string> {
    return of('Martha Tilaar Shop');
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
