import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfigService } from '@app/core';
import { OrderSummary, SummaryPayment } from '@app/models/checkout';
import { OrderCancelDialogComponent } from '@app/shared/order-cancel-dialog/order-cancel-dialog.component';
import { AlertDialogComponent } from '@app/shared/alert-dialog';
import { OrderHistoryService } from '@app/services';
import { AnalyticGtmService } from '@app/services/web-analytic';
import { GtagService } from '@app/library/gtagjs/gtag.service';

@Component({
  selector: 'app-order-summary-progress',
  templateUrl: './order-summary-progress.component.html',
  styleUrls: ['./order-summary-progress.component.scss'],
})
export class OrderSummaryProgressComponent implements OnInit {
  @Input() orderSummary: OrderSummary;

  orderNumber: string;
  gaAccountType = '';

  get payment(): SummaryPayment {
    return this.orderSummary.payment;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderHistory: OrderHistoryService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private appConfigService: ConfigService,
    private analyticGtmService: AnalyticGtmService,
    private gtag: GtagService
  ) {
  }

  ngOnInit(): void {
    this.orderNumber = this.route.snapshot.queryParams.order_id;
    this.gaAccountType = this.appConfigService.config?.gaAccountType;

    this.setTag();
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

    dialogRef.afterClosed().subscribe(({isCancel}: { isCancel: boolean }) => {
      if (isCancel) {
        this.onOrderCancel();
      }
    })
  }

  onOrderCancel(): void {
    if (this.orderNumber) {
      this.orderHistory.cancelOrder(this.orderNumber).subscribe(() => {
        //
        this.router.navigateByUrl(`profile/orders/${this.orderNumber}`);
      }, error => {
        // handle error
        this.orderCancelFailMessage(error);
        this.router.navigateByUrl(`profile/orders/${this.orderNumber}`);
      });
    }
  }

  orderCancelFailMessage(error: any): void {
    const params = {
      status: error.status,
      message: 'Failed to cancel order, maybe you already canceled it.',
      additionalMessage: error.error.detail || error.error.message,
      icon: 'error_outline',
    };
    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: params,
      duration: 5 * 1000, // 5 seconds
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['mt-alert--is-info', 'mt-alert--has-text-centered'],
    });
  }

  setTag() {
    if (this.gaAccountType === 'gtm') {
      this.analyticGtmService.pageView('Order Summary Progress', this.router.url);
    } else {
      this.gtag.pageView('Order Summary Progress', this.router.url);
    }
  }
}
