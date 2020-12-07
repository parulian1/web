import {Component, OnInit} from '@angular/core';
import { ClientService } from '@app/services';

/**
 * A simple component that just displays a copyright notice with the
 * current year.
 */
@Component({
  selector: 'app-copyright',
  template: `
    © {{ currentYear }} {{ shopName }} created by PT Gramedia Digital Nusantara
  `,
  styles: [`
    :host {
      background-color: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      line-height: 14px;
      color: var(--color-white);
      height: 36px;
    }
    @media screen and (max-width: var(--mobile-break)) {
      :host {
        padding: 12px;
        font-size: 10px;
        line-height: 13px;
      }
    }
  `]
})
export class CopyrightComponent implements OnInit {

  shopName: string;
  currentYear: number;

  constructor(protected clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.storeName().subscribe(
      shopName => this.shopName = shopName
    );
    this.currentYear = (new Date()).getFullYear();
  }
}
