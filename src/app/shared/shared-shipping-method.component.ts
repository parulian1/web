import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Logger } from '@app/core';

import { ShippingCost } from '@app/models/shipping-method';
import { CartWeight } from '@app/models/cart';
import { EntityToSlugPipe } from "@app/shared/utils/entity-to-slug.pipe";
import { MatSelectChange } from "@angular/material/select";

const log = new Logger('Shipping-Method');

@Component({
  selector: 'app-shared-shipping-method',
  template: `
    <mat-select [(value)]="selectedShipmentCost"
      placeholder="Pilih Pengiriman" (selectionChange)="selectChange($event, item.href)">
        <ng-container *ngFor="let method of shippingMethod">
          <ng-container *ngIf="method.warehouse === (item.href|entityToSlug)">
            <ng-container *ngFor="let cost of method.shippingCost">
              <mat-option
                [value]="cost"
              ><b>{{ cost.method }}</b>
                | {{ cost.cost|currency:'Rp. ': 'symbol' : '1.0' }} ({{ cost.sla }})
              </mat-option>

            </ng-container>
          </ng-container>
        </ng-container>
    </mat-select>
  `,
  styleUrls: ['./shared-shipping-method.scss']
})
export class SharedShippingMethodComponent implements OnInit {
  @Input() shippingMethod: Array<{ shippingCost: ShippingCost[], warehouse: string }>;
  @Input() item: CartWeight;
  @Input() shippingSelect: Array<{ method?: ShippingCost, warehouse: string, status?: boolean }>;
  @Input() selectedShipmentCost: ShippingCost;

  @Output() shippingChosen = new EventEmitter<Array<{ warehouse: string, cost?: number, status?: boolean }>>();

  constructor(private pipe: EntityToSlugPipe) {
  }

  ngOnInit() {
  }

  selectChange($event: MatSelectChange, href: string) {
    const slug = this.pipe.transform(href);

    this.shippingSelect.filter(m => m.warehouse === slug).map(data => data.method = $event.value);
    this.shippingSelect.filter(m => m.warehouse === slug).map(status => status.status = true);

    this.shippingChosen.emit(this.shippingSelect);
  }

}

