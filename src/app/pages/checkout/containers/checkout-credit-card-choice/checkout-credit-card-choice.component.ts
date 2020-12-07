import { Component, Inject, OnInit } from "@angular/core";

import { UserPaymentService } from "@app/services/user-payment.service";
import { UserPayment } from "@app/models/customer/payment";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  CreditCardUtil,
  formatMaskedCardNumber, getCard,
} from "@app/pages/checkout/utils";


@Component({
  selector: "app-checkout-credit-card-choice",
  template: `
    <div class="cc-wrapper">
      <div class="cc--header">
        <h3 class="title">Kartu Kredit</h3>
        <p class="close">
          <a (click)="onClose()">X</a>
        </p>
      </div>

      <!-- List of CC Saved -->
      <div class="cc--content">
        <a class="cc--card-linked" *ngFor="let entity of entities" (click)="onSelected(entity)" >
          <div class="cc--card">
            <p class="cc--number">
              {{ richMaskedCard(entity.maskedCard) }}
            </p>
            <div class="cc--img">
              <img src="{{ creditCard(entity.maskedCard).cardImg }}" />
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./checkout-credit-card-choice.component.scss']
})
export class CheckoutCreditCardChoiceComponent implements OnInit {
  entities: UserPayment[] = [];

  constructor(
    private userPaymentService: UserPaymentService,
    public dialogRef: MatDialogRef<CheckoutCreditCardChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userPaymentService.fetchList().subscribe((result) => {
      this.entities = result.entities;
    });
  }

  onSelected(creditCardSelected: UserPayment): void {
    this.dialogRef.close({ creditCardSelected });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  /*
   * default maskedCard (number) from api so poor, handle properly way in this method
   * */
  richMaskedCard(number): string {
    return formatMaskedCardNumber(number);
  }

  creditCard(number): CreditCardUtil {
    return getCard(number);
  }
}
