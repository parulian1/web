import {Component, DoCheck, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaymentMethod, PaymentMethodType} from '@app/models/payment-method';
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatRadioChange} from "@angular/material/radio";
import {StateCheckout} from "@app/services";
import {Logger} from "@app/core";
import {EntityToSlugPipe} from "@app/shared/utils/entity-to-slug.pipe";
import { MatDialog } from "@angular/material/dialog";
import { CheckoutCreditCardChoiceComponent } from "@app/pages/checkout/containers";

const log = new Logger('Payment');

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, DoCheck {
  @ViewChildren('panel') panels: QueryList<ElementRef>;

  paymentLists: Array<PaymentMethod> = [];
  paymentMethod: PaymentMethodType;
  paymentChosen = '';
  payments: PaymentMethodType;
  mode = 'idle';
  isDisabled: boolean;

  constructor(private route: ActivatedRoute,
              public stateService: StateCheckout,
              private pipe: EntityToSlugPipe,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { payment: Array<PaymentMethod> }) => {
        this.paymentLists = data.payment;
      });
    this.isDisabled = true;
  }

  ngDoCheck(): void {
    if (this.stateService.getStateAddress && this.stateService.getStateShippingMethod && this.paymentChosen === '') {
      this.mode = 'edit';
    }
  }

  onChange($event: MatRadioChange, panel1: MatExpansionPanel) {
    panel1.open();
  }

  paymentChange($event: MatRadioChange) {
    this.isDisabled = false;
    this.payments = $event.value;
    this.paymentChosen = this.pipe.transform($event.value.href);
    this.stateService.removeSavedTokenId();
  }

  savePaymentMethod() {
    log.debug(this.paymentChosen);
    this.stateService.statePaymentMethod = this.paymentChosen;
    this.mode = 'default';
  }

  changeMode() {
    this.mode = 'edit';
  }

  openCreditCardChoiceDialog(item: PaymentMethod) {
    let dialog = this.dialog.open(CheckoutCreditCardChoiceComponent, {
      data: {},
      width: "540px",
      height: "600px",
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.paymentMethod = item.paymentMethods[0];
        this.stateService.savedTokenId = result.creditCardSelected.savedTokenId;

        this.isDisabled = false;
        this.payments = item.paymentMethods[0];
        this.paymentChosen = item.paymentMethods[0].type;

        this.savePaymentMethod();
      }
    })
  }
}
