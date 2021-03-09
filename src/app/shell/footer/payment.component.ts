import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PaymentMethodService } from '@app/services/payment-method.service';
import { PaymentMethodType } from '@app/models/payment-method';

@Component({
  selector: 'app-footer-payment',
  template: `
    <div class="list" id="payment-footer" *ngIf="childPaymentMethods.length > 0">
      <div class="title">
        <span>Pembayaran</span>
      </div>
      <div class="payment-logo">
        <ng-container *ngFor="let childPaymentMethod of childPaymentMethods;">
          <img *ngIf="getIsCdnImage(childPaymentMethod.logo); else elseImage" [src]="childPaymentMethod.logo" [alt]="childPaymentMethod.name"  appImgResize />
          <ng-template #elseImage>
            <img [src]="childPaymentMethod.logo" [alt]="childPaymentMethod.name" />
          </ng-template>
        </ng-container>

      </div>
    </div>
  `,
  styleUrls: ['./payment.footer.scss']
})
export class PaymentComponent implements  OnInit {
  childPaymentMethods: PaymentMethodType[] = [];
  constructor(private paymentMethodService: PaymentMethodService) {
  }

  ngOnInit() {
    this.fetchPaymentMethods();
  }

  fetchPaymentMethods() {
    this.paymentMethodService.fetchList().subscribe((resp) => {
      resp.forEach((record) => {
        record?.paymentMethods?.forEach((_paymentMethod) => {
          if (_paymentMethod.isActive) {
            this.childPaymentMethods.push(_paymentMethod);
          }
        });
      });
    });
  }

  getIsCdnImage(logo: string): boolean {
    if (!logo) {
      return false;
    }
    return logo.includes('cdn');
  }

}
