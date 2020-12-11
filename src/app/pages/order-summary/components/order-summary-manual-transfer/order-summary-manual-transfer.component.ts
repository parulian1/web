import {Component, Input, OnInit} from "@angular/core";
import {OrderSummary, SummaryPayment} from "@app/models/checkout";
import { PaymentMethodService } from "@app/services/payment-method.service";
import { PaymentMethodType } from "@app/models/payment-method";

@Component({
  selector: "app-order-manual-transfer",
  template: `
    <div class="order-progress">
      <div class="order-progress-header" style="margin-bottom: 20px">
        <h2 class="title has-text-centered">
          Selesaikan Pembayaran Anda
        </h2>
      </div>

      <div class="order-progress-content">
        <div class="order-progress--date-and-bank">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="order-summary__date has-text-centered">
                <h2 class="due-date-title">Batas akhir pembayaran</h2>
                <p class="due-date-content">{{ payment.dateExpired | date: "EEEE, d/MM/yyyy HH:mm" }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-progress--info">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="box">
                <h2 class="info-title">Informasi Pemesanan</h2>

                <div class="info-desc">
                  <div class="info-desc-item">
                    <h4 class="item-header">Nomor Pesanan</h4>
                    <p>{{ orderSummary.orderNumber }}</p>
                  </div>
                  <div class="info-desc-item">
                    <h4 class="item-header">Tanggal Pemesanan</h4>
                    <p>{{ orderSummary.created | date: "d MMMM y" }}</p>
                  </div>
                  <div class="info-desc-item">
                    <h4 class="item-header">Total Belanja</h4>
                    <p class="payment-amount">{{ payment.amount | currency: "Rp ":"symbol":"1.0" }}</p>
                  </div>
                  <div class="info-desc-item">
                    <h4 class="item-header">Metode Pembayaran</h4>
                    <p>{{ payment.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="order-progress--bank">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="columns is-multiline">

                <div class="column is-6" *ngFor="let manualTransfer of manualTransfers">
                  <div class="box box-bank">
                    <div class="bank-image">
                      <img width="100px;" [src]="manualTransfer.logo" alt="{{ manualTransfer.accountHoldNumber }}" />
                    </div>
                    <div class="transfer">
                      <div>No. Rekening</div>
                      <div class="transfer-number">
                        <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                          <span class="number">{{ manualTransfer.accountNumber }}</span>
                          <span class="copy transfer--copy" (click)="copyToClipboard(manualTransfer.accountNumber)">Salin</span>
                        </div>

                        <span class="account-hold-number">
                          {{ manualTransfer.accountHoldNumber }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="order-progress--actions">
          <div class="columns is-multiline">
            <div class="column is-8 is-offset-2">
              <p style="color: #979797;" class="has-text-centered">
                Segera lakukan konfirmasi pembayaran agar kami dapat memproses pesanan
              </p>
              <div class="box has-text-centered" style="background-color: #F03BB3;">
                <a style="background-color: inherit; color: white;" class="button-cancel" [routerLink]="['/order-confirm']">
                  Konfirmasi Pembayaran
                </a>
              </div>&nbsp;
              <div class="box has-text-centered">
                <a class="button-cancel" [routerLink]="['/profile/orders/', orderSummary.orderNumber]">
                  Batalkan Pesanan
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="order-progress--guide">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="box">
                <h3 class="title guide-title">Petunjuk Pembayaran</h3>
                <div class="guide-content">
                  <ol>
                    <li>Transfer melalui ATM, Internet Banking, atau Mobile Banking Anda</li>
                    <li>Pilih tujuan transfer dari salah satu bank dan nomor rekening yang tertera di bawah</li>
                    <li>Masukkan jumlah transfer</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./order-summary-manual-transfer.component.scss'],
})
export class OrderSummaryManualTransferComponent implements OnInit {
  @Input() orderSummary: OrderSummary;

  payment: SummaryPayment;
  manualTransfers: PaymentMethodType[] = [];

  constructor(
    private paymentMethodService: PaymentMethodService,
  ) {}

  ngOnInit(): void {
    this.paymentMethodService.fetchList(true).subscribe(result => {
      this.manualTransfers = result
        .filter(pList => pList.type === 'manual_transfer')
        .map(payment => payment.paymentMethods)[0];

      console.log('manual:', this.manualTransfers);
    });

    this.payment = {
      ...this.orderSummary.payment,
      dateExpired: this.dateAddDays(this.orderSummary.created),
    };
  }


  copyToClipboard(vaNumber: string) {
    if (vaNumber) {
      document.addEventListener("copy", (e: ClipboardEvent) => {
        e.clipboardData.setData("text/plain", vaNumber);
        e.preventDefault();
        document.removeEventListener("copy", null);
      });
      document.execCommand("copy");
    }
  }

  dateAddDays(datetime: string, days: number = 1): string {
    const dateFormatted = new Date(this.orderSummary.created);
    dateFormatted.setDate(dateFormatted.getDate() + days);
    return dateFormatted.toISOString();
  }
}
