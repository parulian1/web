import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Addresses} from '@app/models/addresses';
import {Cart, CartModified, CartTotals} from '@app/models/cart';
import {Area} from '@app/models/area';
import {Logger} from '@app/core';
import {ShippingMethodService} from '@app/services/shipping-method.service';
import {ShippingCost} from '@app/models/shipping-method';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {StateCheckout} from '@app/services';
import {CheckoutService} from "@app/services/checkout.service";
import {environment} from "@env/environment.staging";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertDialogComponent} from "@app/shared/alert-dialog";
import { PaymentTypeChoices } from "@app/models/payment-method";

const log = new Logger('Checkout');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, DoCheck {
  formattedShipping = [];
  cart: Cart;
  address: Addresses;
  shippingMethod$: Array<{ shippingCost: ShippingCost[], warehouse: string }> = [];
  checkoutParams: Array<{ totals?: any, shipping?: Array<any>, payment?: any, address?: any }> = [];
  warehouse: Array<{ href: string, name: string, postalCode?: string }> = [];
  tempShippingMethod: Array<{ warehouse: string, method: string, cost: number }> = [];
  cartTotals: CartTotals;
  total = [];
  shippingMethodMode: 'idle' | 'edit' | 'default' = 'idle';
  canCheckout: boolean;
  errorMessages: object = {};

  @Output() checkoutEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private shippingServices: ShippingMethodService,
              private pipe: EntityToSlugPipe,
              private stateService: StateCheckout,
              private service: CheckoutService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: {
        cart: CartModified,
        addresses: Addresses[],
        provinces: Area[]
      }) => {
        this.cart = data.cart[0].cart;
        if (this.cart.cartItems.length !== 0) {
          for (const item of this.cart.cartItems) {
            this.warehouse.push(item.warehouse);
          }
          this.warehouse = [...new Set(this.warehouse)];
          for (const store of this.warehouse) {
            for (const storeCart of this.cart.weight) {
              if (store.href === storeCart.href) {
                store.postalCode = storeCart.postalCode;
                break;
              }
            }
          }
        } else {
          const params = {
            message: 'Your cart is empty. Redirecting back to cart...',
          };
          this.snackbar.openFromComponent(AlertDialogComponent, {
            data: params,
            duration: 7 * 1000, // 5 seconds
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigateByUrl('/cart');
        }

        if (data.addresses.length > 0) {
          this.address = data.addresses[0];
          this.stateService.stateAddress = this.address;
          this.changeShippingMethodMode('edit');
        }
      });

    if (this.cart) {
      this.cartTotals = this.cart.cartTotals;
    }
    this.canCheckout = this.stateService.canCheckout;
  }

  getAddress($event: Addresses) {
    if ($event) {
      this.address = $event;
      this.checkoutParams.push({address: this.address});
      this.total = [];
      this.cartTotals.shippingTotal = 0;

      if (this.address) {
        this.stateService.stateAddress = this.address;

        if (this.shippingMethod$.length) {
          this.shippingMethod$ = [];  // if shippingMethod$ already have values, clear it.
        }

        this.getShippingCost(this.cart, this.address);
      }
    }
  }

  getShipping($event: any) {
    if (this.tempShippingMethod.length === 0) {
      this.tempShippingMethod.push($event);
    } else {
      for (const [i, v] of this.tempShippingMethod.entries()) {
        if ((v.warehouse === $event.warehouse)) {
          this.tempShippingMethod.splice(i, 1);
          break;
        }
      }
      this.tempShippingMethod.push($event);
    }
    const shippingCheckout = this.checkoutParams.filter(m => m.shipping);

    if (shippingCheckout.length === 0) {
      this.checkoutParams.push({shipping: this.tempShippingMethod});
    }
  }

  getTotalShipping($event: any) {
    this.cartTotals.shippingTotal = 0;
    this.cartTotals.shippingTotal += $event.costChange;
    this.cartTotals.grandTotal = (this.cartTotals.subTotal + this.cartTotals.shippingTotal) - this.cartTotals.discountTotal;
  }

  ngDoCheck(): void {
    this.canCheckout = this.stateService.canCheckout;
    if (this.canCheckout) {
      this.canCheckout = this.cart.cartItems.filter((cartItem) => {
        return cartItem.isInStock === true;
      }).length === this.cart.cartItems.length;
    }
  }

  createOrder() {
    if (this.canCheckout) {
      log.debug(this.stateService.getStateShippingSelect);
      this.formattedShipping = [];
      for (const ship of this.stateService.getStateShippingSelect) {
        const param = {
          warehouse: ship.fullWarehouse,
          method: ship.method.method,
          service: ship.method.service,
          cost: ship.method.cost,
          separate_delivery: false
        };
        this.formattedShipping.push(param);
      }
    }

    const order = {
      'totals': {
        'subtotal': this.cartTotals.subTotal,
        'shipping_cost': this.cartTotals.shippingTotal,
        'discount': this.cartTotals.discountTotal,
        'total': (this.cartTotals.subTotal + this.cartTotals.shippingTotal) - this.cartTotals.discountTotal
      },
      'shipping': this.formattedShipping,
      'payment': {
        'method': this.stateService.getStatePaymentMethod,
        'savedTokenId': this.stateService.savedTokenId,
      },
      'address': {
        'ship_to_name': this.stateService.getStateAddress.shipToName,
        'country': environment.SHIPPING_COUNTRY_CODE,
        'state': this.stateService.getStateAddress.state,
        'city': this.stateService.getStateAddress.city,
        'district': this.stateService.getStateAddress.district,
        'street': this.stateService.getStateAddress.street,
        'zipcode': this.stateService.getStateAddress.zipcode,
        'phone_number': this.stateService.getStateAddress.phoneNumber,
      }
    };

    log.debug(order);

    if (this.cart.cartItems.length !== 0) {
      this.service.createOrder(order).subscribe(res => {
        if (res.status === 201) {
          const orderNumber = {
            order_number: this.pipe.transform(res.headers.get('location')),
          };

          if (this.stateService.getStatePayment.type !== PaymentTypeChoices.MANUAL_TRANSFER) {
            this.service.fetchPaymentRequest(orderNumber).subscribe(resp => {
              if (resp.status === 200) {
                window.location.href = resp.body.redirectUrl;
              }
            });
          } else {
            this.router.navigate(
              ['order-summary'], { queryParams: { order_id: orderNumber.order_number } }
              );
          }
        }
      }, (error) => {
        this._handleError(error);
      });
    } else {
      const params = {
        message: 'Your cart is empty. Redirecting back to cart...',
      };
      this.snackbar.openFromComponent(AlertDialogComponent, {
        data: params,
        duration: 7 * 1000, // 5 seconds
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.router.navigateByUrl('/cart');
    }
  }

  private getShippingCost(cart: Cart, address: Addresses) {
    const destinationZipcode = address.zipcode;
    this.shippingMethod$ = [];
    for (const item of cart.weight) {
      const originZipcode = item.postalCode;
      const totalWeight = item.totalWeight;
      this.shippingServices.getShippingCost(totalWeight, originZipcode, destinationZipcode).subscribe(resp => {
        this.changeShippingMethodMode('edit');
        this.shippingMethod$.push({shippingCost: resp.body, warehouse: this.pipe.transform(item.href)});
      }, error => {
        this.changeShippingMethodMode('edit');
        this.stateService.err.push(this.pipe.transform(item.href));
      });
    }
  }

  changeShippingMethodMode(value: 'edit' | 'default', force: boolean = false): void {
    // can change when mode still in 'idle' value
    // its just make ensure change of mode dont make any side effect.
    if (this.shippingMethodMode === 'idle') {
      this.shippingMethodMode = value;
    }

    // force change.
    if (force) { this.shippingMethodMode = value; }
  }

  _handleError(err) {
    if (err.status === 400) {
      this._setErrors(err.error);
    } else {
      log.error("unexpected error:", err);
    }
  }
  _setErrors(error: any) {
    log.error("error", error, Object.values(error));
    Object.keys(error).forEach((field: any) => {
      if (error[field] instanceof Array) {
        this.errorMessages[field] = error[field][0];
      } else {
        this.errorMessages[field] = error[field];
      }
    });
    log.error("error", this.errorMessages);
  }
}
