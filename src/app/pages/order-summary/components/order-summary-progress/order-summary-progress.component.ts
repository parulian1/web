import { Component, Input, OnInit } from "@angular/core";
import { OrderSummary, SummaryPayment } from "@app/models/checkout";

@Component({
  selector: "app-order-summary-progress",
  templateUrl: "./order-summary-progress.component.html",
  styleUrls: ["./order-summary-progress.component.scss"],
})
export class OrderSummaryProgressComponent implements OnInit {
  @Input() orderSummary: OrderSummary;

  get payment(): SummaryPayment {
    return this.orderSummary.payment;
  }

  constructor() {}
  ngOnInit(): void {}

  //
  isVirtualAccount(): boolean {
    // todo: how to detect this payment order from virtual account or not ?, its still ambiguous
    //        for now using status payment, (unpaid must be VA payment)...
    return this.payment.status === 'unpaid';
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
