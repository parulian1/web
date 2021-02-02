import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShippingMethod } from "@app/models/shipping-method";
import { DEFAULT_SHIPPING_ICON_NOT_FOUND } from "@app/shell/footer/constants";

@Component({
  selector: 'app-footer-shipping',
  template: `
    <div style="display: inline;">
      <img *ngFor="let shipping of shippings" [src]="getIconOrDefault(shipping)"/>
    </div>
  `,
  styleUrls: [`./footer-shipping.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterShippingComponent {
  @Input() shippings: ShippingMethod[] = [];

  getIconOrDefault(shipping: ShippingMethod) {
    return shipping?.icon || DEFAULT_SHIPPING_ICON_NOT_FOUND;
  }
}
