import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart} from '@app/models/cart';
import {ActivatedRoute, Router} from '@angular/router';
import {DropshipMeta, DropshipOption, ShippingMethod} from '@app/models/shipping-method';
import {ShippingCost} from '@app/models/shipping-method';
import {Addresses} from '@app/models/addresses';
import {ShippingMethodService} from '@app/services/shipping-method.service';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {Logger} from '@app/core';
import {StateCheckout} from "@app/services";

const log = new Logger('ShippingMethod');

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.scss']
})
export class ShippingMethodComponent implements OnInit {
  @Input() cart: Cart;
  @Input() warehouse: Array<{ href: string, name: string, postalCode?: string }>;
  @Input() address: Addresses;
  @Input() shippingMethod: Array<{ shippingCost: ShippingCost[], warehouse: string }> = [];
  @Input() isReseller: boolean;

  @Output() shipping: EventEmitter<any> = new EventEmitter<any>();
  @Output() totalShipping: EventEmitter<any> = new EventEmitter<any>();

  shippingMethods: Array<ShippingCost> = [];
  ship: Array<ShippingMethod>;
  destinationZipcode: string;
  shippingParams: Array<{ warehouse: string, cost: number, method: string }> = [];
  shippingSelect: Array<{ method?: ShippingCost, warehouse: string, fullWarehouse?: string, status?: boolean }> = [];
  @Input() mode: 'idle' | 'edit' | 'default' = 'idle';
  dropshipOpen = false;
  dropshipOption : DropshipOption;
  shippingError = '';

  constructor(private route: ActivatedRoute,
              private shippingServices: ShippingMethodService,
              private pipe: EntityToSlugPipe,
              private router: Router,
              public stateService: StateCheckout) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { shipping: Array<ShippingMethod>, addresses: Addresses, cart: Cart }) => {
        this.ship = data.shipping;
      });

    if(this.address) {
      this.getShippingCost(this.cart, this.address);
    }

    for (const w of this.cart.weight) {
      const slug = this.pipe.transform(w.href);
      this.shippingSelect.push({warehouse: slug, fullWarehouse: w.href, method: null, status: false});
    }

    this.stateService.stateShippingSelect = this.shippingSelect;

    if (this.stateService.getStateAddress) {
      this.mode = 'edit';
    }
    this.dropshipOption = <DropshipOption>{ active: false, meta: <DropshipMeta>{ name: '', mobile: ''}};
  }

  getShippingChosen($event: Array<{ warehouse: string; cost?: number; status?: boolean }>) {
    this.shippingSelect = $event;
    log.debug(this.shippingSelect);

    let tempTotal = 0;
    for (const ship of this.shippingSelect) {
      if (ship.method) {
        if (ship.method.cost !== 0) {
          tempTotal += ship.method.cost;
        }
      }
    }

    this.calculateShipping(tempTotal);
  }

  isButtonDisabled(): boolean {
    return this.shippingSelect.filter(m => m.status === false).length > 0;
  }

  saveShippingMethod() {
    log.debug(this.dropshipOption);
    if (this.dropshipOption.active) {
      if (this.validDropship(this.dropshipOption.meta)) {
        this.stateService.stateDropshipOption = this.dropshipOption;
        this.mode = 'default';
        this.shippingError = ''
      } else {
        this.mode = 'edit';
        this.shippingError = 'Data dropship tidak lengkap';
      }
    } else {
      this.stateService.stateDropshipOption = <DropshipOption>{ active: false };
      this.shippingError = '';
    }
    if (this.shippingError === '') {  // TODO: Bad way, fix it bro

      log.debug(this.shippingSelect.map(m => m.method));
      this.stateService.stateShippingMethod = this.shippingSelect.map(m => m.method);
      this.mode = 'default';
    }
  }

  validDropship(dropshipMeta: DropshipMeta) {
    //TODO: More complete validation
    return dropshipMeta.name!== '' && dropshipMeta.mobile !== '';
  }

  changeMode() {
    this.mode = 'edit';
    this.calculateShipping(0);
  }

  private getShippingCost(cart: Cart, address: Addresses) {
    this.destinationZipcode = address.zipcode;
    for (const item of cart.weight) {
      const originZipcode = item.postalCode;
      const totalWeight = item.totalWeight;
      this.shippingServices.getShippingCost(totalWeight, originZipcode, this.destinationZipcode).subscribe(res => {
        if (res) {
          for (const method of res.body) {
            this.shippingMethods.push(method);
          }
        }
      });
    }
  }

  private calculateShipping(value: any) {
    const param = {
      costChange: value,
    };
    this.totalShipping.emit(param);
  }

  dropshipSelected(checked: boolean): void {
    this.dropshipOpen = checked;
  }
}
