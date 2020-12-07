import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

import {Logger} from '@app/core';

import {ShippingCost} from '@app/models/shipping-method';
import {CartWeight} from '@app/models/cart';
import {EntityToSlugPipe} from "@app/shared/utils/entity-to-slug.pipe";
import {StateCheckout} from "@app/services";

const log = new Logger('SelectPrice');

@Component({
  selector: 'app-select-price',
  templateUrl: './select-price.component.html',
  styleUrls: ['./select-price.component.scss']
})
export class SelectPriceComponent implements OnInit {
  @Input() shippingMethod: Array<{ shippingCost: ShippingCost[], warehouse: string }>;
  @Input() item: CartWeight;
  @Input() shippingSelect: Array<{ method?: ShippingCost, warehouse: string, status?: boolean }>;

  @Output() shippingChosen = new EventEmitter<Array<{ warehouse: string, cost?: number, status?: boolean }>>();

  constructor(private pipe: EntityToSlugPipe,
              public stateService: StateCheckout) {
  }

  ngOnInit(): void {
    log.debug(this.stateService.err);
  }

  selectChange($event: MatSelectChange, href: string) {
    const slug = this.pipe.transform(href);

    this.shippingSelect.filter(m => m.warehouse === slug).map(data => data.method = $event.value);
    this.shippingSelect.filter(m => m.warehouse === slug).map(status => status.status = true);

    this.shippingChosen.emit(this.shippingSelect);
  }
}
