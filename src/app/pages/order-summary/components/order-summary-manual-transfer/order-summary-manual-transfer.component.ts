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
            <div class="column is-4 is-offset-2">
              <div class="box box-date">
                <span class="due-date-title">Batas Pembayaran</span>
                <span class="due-date-content">{{ payment.dateExpired | date: "d/MM/yyyy HH:mm" }}</span>
              </div>
            </div>

            <div class="column is-4">
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
                    <p>{{ payment.amount | currency: "Rp ":"symbol":"1.0" }}</p>
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

        <div class="order-progress--actions">
          <div class="columns">
            <div class="column is-8 is-offset-2">
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
                  <p>Harap dicatat bahwa pesanan akan dibatalkan secara otomatis setelah 24 jam.</p>
                  <p>Anda dapat membayar dengan melakukan transfer pada rekening berikut:</p>
                  <ul *ngIf="manualTransfers?.length > 0">
                    <li *ngFor="let manualTransfer of manualTransfers">
                      {{ manualTransfer.name }} - {{ manualTransfer.accountHoldNumber }} - {{ manualTransfer.accountNumber }}
                    </li>
                  </ul>
                  <p>Setelah anda melakukan transfer bank, harap beritahu kami dengan memasukkan detail transaksi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="order-progress--confirmation">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="has-text-centered">
                <a class="button-confirmation" [routerLink]="['/profile/orders/', orderSummary.orderNumber]">
                  Konfirmasi Pembayaran
                </a>
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

  manualTransfers: PaymentMethodType[] = [];

  get payment(): SummaryPayment {
    return this.orderSummary.payment;
  }

  constructor(
    private paymentMethodService: PaymentMethodService,
  ) {}
  ngOnInit(): void {
    this.paymentMethodService.fetchList(true).subscribe(result => {
      this.manualTransfers = result
        .filter(pList => pList.type === 'manual_transfer')
        .map(payment => payment.paymentMethods)[0];
    });
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
}
