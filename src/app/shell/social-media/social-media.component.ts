import {Component, OnInit} from '@angular/core';

import { ClientService } from '@app/services';
import { SocialMediaPage } from '@app/models/social-media';

/**
 * Displays a CTA and shows links to the client's social media pages.
 */
@Component({
  selector: 'app-social-media',
  template: `
    <div class="footer-top">
      <p>Follow dan invite social media kami di {{ storeName }}</p>
      <a *ngFor="let link of socialMediaPages"
         [href]="link.href"
         appSocialIcon>
      </a>
    </div>

  `,
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  socialMediaPages: Array<SocialMediaPage>;
  storeName: string;

  constructor(protected clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.socialMediaLinks().subscribe(
      links => this.socialMediaPages = links
    );

    this.clientService.storeName().subscribe(
      storeName => this.storeName = storeName
    );
  }
}
