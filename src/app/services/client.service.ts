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
    let storeName = "Nusantara Platform";
    if (!!this.appConfigService.config?.name){
      storeName = this.appConfigService.config.name.substr(0, 1).toUpperCase() +
        this.appConfigService.config.name.substr(1);
    }
    return of(storeName);
  }

  /**
   * Get the clients social media pages.
   */
  socialMediaLinks(): Observable<SocialMediaPage[]> {
    return of(this.appConfigService.config.socialMedias);
  }
}
