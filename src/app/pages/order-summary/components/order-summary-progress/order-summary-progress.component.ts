import { Component, Input, OnInit } from '@angular/core';
import { OrderSummary, SummaryPayment } from '@app/models/checkout';
import { OrderCancelDialogComponent } from '@app/shared/order-cancel-dialog/order-cancel-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryService } from '@app/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-summary-progress',
  templateUrl: './order-summary-progress.component.html',
  styleUrls: ['./order-summary-progress.component.scss'],
})
export class OrderSummaryProgressComponent implements OnInit {
  @Input() orderSummary: OrderSummary;
  orderNumber: string;

  get payment(): SummaryPayment {
    return this.orderSummary.payment;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderHistory: OrderHistoryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.orderNumber = this.route.snapshot.queryParams.order_id;
  }

  //
  isVirtualAccount(): boolean {
    // todo: how to detect this payment order from virtual account or not ?, its still ambiguous
    //        for now using status payment, (unpaid must be VA payment)...
    return this.payment.status === 'unpaid';
  }
  copyToClipboard(vaNumber: string) {
    if (vaNumber) {
      document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', vaNumber);
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');
    }
  }

  openOrderCancelDialog(): void {
    const dialogRef = this.dialog.open(OrderCancelDialogComponent, {
      // height: '10vh',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(({ isCancel }: { isCancel: boolean }) => {
      if (isCancel) { this.onOrderCancel(); }
    })
  }
  onOrderCancel(): void {
    if (this.orderNumber) {
      this.orderHistory.cancelOrder(this.orderNumber).subscribe(() => {
        //
        this.router.navigateByUrl(`profile/orders/${this.orderNumber}`)
      });
    }
  }
}
