import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Order } from "@app/models/order";
import { OrderShipmentService } from "@app/services/order-shipment.service";
import { Choice } from "@app/models/drf";
import { CheckoutService } from "@app/services";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertDialogComponent } from "@app/shared/alert-dialog";
import { getBank, AbstractBank } from "@app/pages/order-summary/utils";


/**
 * Allows the currently-logged in user to update their profile data.
 */
@Component({
  selector: 'app-order-history',
  template: `
    <div class="content-title">
      <a [routerLink]="['/profile/orders/']" style="text-decoration: none">
        <img src="assets/arrow-left.svg" class="content-arrow-left" height="14" width="14"/>
      </a>
      <span class="title-big">Detail Transaksi</span>
    </div>
    <div class="parent-div" style="display: flex; margin-bottom: 70px">
      <div *ngIf="!mobile">
        <!--        Order by warehouse-->
        <div style="display: flex;flex-direction: column">
          <div class="order-by-warehouse" *ngFor="let warehouse of order.children">
            <ng-container *ngFor="let subOrder of warehouse.data">
              <span class="warehouse-title">{{ warehouse.warehouse.name }} / {{ warehouse.warehouse.code }}</span>
              <div class="shipping-box">
                <table>
                  <tr>
                    <th>Status Pengiriman</th>
                    <th>Metode Pengiriman</th>
                    <th>Nomor Resi</th>
                  </tr>
                  <tr>
                    <td>{{ getStatusName(subOrder.status) }}</td>
                    <td>{{ subOrder.shippingMethod }}</td>
                    <td>{{ subOrder.shipmentHistory ? subOrder.shipmentHistory.airwayBillNumber : '-' }}</td>
                  </tr>
                  <ng-container *ngIf="subOrder.shipmentHistory !== null">
                    <p *ngIf="showTrackOrder" class="track-order" (click)="trackOrderToggle()">Lacak Pesanan</p>
                  </ng-container>
                  <tr *ngIf="shipmentHistory">
                    <td colspan="3">
                      <hr class="shipment-history-hr"/>
                    </td>
                  </tr>
                  <ng-container *ngIf="shipmentHistory">
                    <tr *ngFor="let history of subOrder.shipmentHistory.histories; let index=index;"
                        class="shipment-history-row">
                      <td class="shipment-history-date">
                        <ng-container *ngIf="index !== 0">
                          <i class="material-icons check_circle"></i>
                          {{ history.created | date: 'dd MMM yyyy | HH:mm' }}
                        </ng-container>
                        <ng-container *ngIf="index === 0">
                          <i
                            class="material-icons check_circle blue"></i>
                          {{ history.created | date: 'dd MMM yyyy | HH:mm' }}
                        </ng-container>
                      </td>
                      <td class="shipment-history-notes">{{ history.notes }}</td>
                    </tr>
                  </ng-container>
                  <p *ngIf="hideTrackOrder" class="track-order" (click)="trackOrderToggle()">Sembunyikan</p>
                </table>
              </div>
              <ng-container *ngFor="let lineItems of subOrder.lineItems">
                <div class="product-box">
                  <table class="product-image" border="0" align="left">
                    <tbody>
                    <td style="vertical-align: top">
                      <img width="78" height="78" src="{{ lineItems.product.image }}"
                           (error)="changeSource($event)"/>
                    </td>
                    </tbody>
                  </table>
                  <div style="margin-left: 12px">
                    <p class="product-title">{{ lineItems.product.name }}</p>
                    <span class="product-qty">QTY {{ lineItems.quantity }}</span>
                    <span class="product-price">{{ lineItems.price | currency:'Rp ':'symbol':'1.0' }}</span>
                  </div>
                </div>
                <div class="bottom-actions">
                  <div class="add-review">
                    <button class="add-review-btn" *ngIf="subOrder.status === 'complete'">
                      <a [routerLink]="[lineItems.product.href|entityToSlug, warehouse.warehouse.slug]">Tulis Ulasan</a></button>
                  </div>
                </div>
                <hr *ngIf="subOrder.lineItems.length > 1"/>
              </ng-container>

              <!--              TODO: hide this for marketplace-->
              <!--              <div class="complain">-->
              <!--                <p class="complain-text"><i class="material-icons info_outline"></i>Maksimal pengajuan komplain 3 hari-->
              <!--                  terhitung dari pesanan diterima</p>-->
              <!--              </div>-->
<!--              <div *ngIf="subOrder.status === 'complete'" class="button-bottom-div">-->
                <!--                <button class="transparent-button">Komplain</button>-->
                <!--                <button class="pink-button margin-left-24">Selesai</button>-->
<!--                <button class="transparent-button">Tulis Ulasan</button>-->
<!--                <button class="pink-button margin-left-24">Beli Lagi</button>-->
<!--              </div>-->

            </ng-container>

          </div>
        </div>
      </div> <!-- order by warehouse -->
      <div class="order-status-parent">
        <!--        Status order-->
        <div style="display: flex;flex-direction: column">
          <div class="order-status-box">
            <div style="display: flex">
              <div style="flex: 70%;" class="order-status-label">
                Status Pesanan
              </div>
              <div style="flex: 30%">
                <!-- looping and get status that match with order.status -->
                <span *ngFor="let s of status">
                  <span
                    *ngIf="order.status === s.value"
                    class="order-status-text"
                    [class]="order.status"
                  >
                    {{ s.displayName | slice:0:7 }}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div class="payment-deadline-box" *ngIf="order.status === 'unpaid'">
            <div style="flex: 1">
              <span class="payment-deadline-label">Batas Pembayaran</span>
            </div>
            <div style="flex: 1">
              <ng-container *ngIf="order.orderPayment?.meta">
            <span class="payment-deadline-datetime">
              {{ order.orderPayment?.meta.dateExpired | date:'dd/MM/yyyy HH:mm' }}
            </span>
              </ng-container>
            </div>
          </div>

          <div class="va-cc-box" *ngIf="order.status === 'unpaid' && !isCCPayment()">
            <table class="va-image" align="left">
              <tbody>
              <td style="vertical-align: top">
                <img width="74" height="40"
                     style="margin-top: 10px;"
                     src="{{ bank.logo }}"
                     alt="va logo"/>
              </td>
              </tbody>
            </table>
            <p class="va-cc-label">Transfer ke nomor</p>
            <ng-container *ngIf="order.orderPayment?.meta">
              <span class="va-cc-number">{{ order.orderPayment?.meta.vaNumber }}</span>
              <button class="va-cc-copy-label" (click)="copyToClipboard(order.orderPayment?.meta.vaNumber)">
                Salin
              </button>
            </ng-container>
          </div>

          <div class="order-detail-box">
            <div style="display: flex">
              <div style="flex: 50%">
                <p class="order-detail-label">Nomer order</p>
                <p class="order-detail-text">{{ order.orderNumber }}</p>
              </div>
              <div style="flex: 50%">
                <p class="order-detail-label">Tanggal pembelian</p>
                <p class="order-detail-text">{{ order.created | date: 'dd MMM yyyy | HH:mm' }}</p>
              </div>
            </div>
            <div style="display: flex; margin-top: 16px">
              <div style="flex: 50%">
                <p class="order-detail-label">Total item</p>
                <p class="order-detail-text">{{ order.totalItems }}</p>
              </div>
              <div style="flex: 50%">
                <p class="order-detail-label">Metode Pembayaran</p>
                <p class="order-detail-text">{{ order.orderPayment.paymentGateway.name }}</p>
              </div>
            </div>
          </div>

          <ng-container *ngIf="mobile">
            <div class="order-by-warehouse" *ngFor="let warehouse of order.children">
              <ng-container *ngFor="let subOrder of warehouse.data">
                <span class="warehouse-title">{{ warehouse.warehouse.name }} / {{ warehouse.warehouse.code }}</span>
                <div class="shipping-box">
                  <table>
                    <tr>
                      <th>Status Pengiriman</th>
                      <th>Metode Pengiriman</th>
                    </tr>
                    <tr>
                      <td>{{ getStatusName(subOrder.status) }}</td>
                      <td>{{ subOrder.shippingMethod }}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>Nomor Resi</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{{ subOrder.shipmentHistory ? subOrder.shipmentHistory.airwayBillNumber : '-' }}</td>
                    </tr>
                    <ng-container *ngIf="subOrder.shipmentHistory !== null">
                      <p *ngIf="showTrackOrder" class="track-order" (click)="trackOrderToggle()">Lacak Pesanan</p>
                    </ng-container>
                    <tr *ngIf="shipmentHistory">
                      <td colspan="3">
                        <hr class="shipment-history-hr"/>
                      </td>
                    </tr>
                    <ng-container *ngIf="shipmentHistory">
                      <tr *ngFor="let history of subOrder.shipmentHistory.histories; let index=index;"
                          class="shipment-history-row">
                        <td class="shipment-history-date">
                          <ng-container *ngIf="index !== 0">
                            <i class="material-icons check_circle"></i>
                            {{ history.created | date: 'dd MMM yyyy | HH:mm' }}
                          </ng-container>
                          <ng-container *ngIf="index === 0">
                            <i class="material-icons check_circle blue"></i>
                            {{ history.created | date: 'dd MMM yyyy | HH:mm' }}
                          </ng-container>
                        </td>
                        <td class="shipment-history-notes">{{ history.notes }}</td>
                      </tr>
                    </ng-container>
                    <p *ngIf="hideTrackOrder" class="track-order" (click)="trackOrderToggle()">Sembunyikan</p>
                  </table>
                </div>
                <ng-container *ngFor="let lineItems of subOrder.lineItems">
                  <div class="product-box">
                    <table class="product-image" border="0" align="left">
                      <tbody>
                      <td style="vertical-align: top">
                        <img width="78" height="78" src="{{ lineItems.product.image }}"
                             (error)="changeSource($event)"/>
                      </td>
                      </tbody>
                    </table>
                    <div style="margin-left: 12px">
                      <p class="product-title">{{ lineItems.product.name }}</p>
                      <span class="product-qty">QTY {{ lineItems.quantity }}</span>
                      <span class="product-price">{{ lineItems.price | currency:'Rp ':'symbol':'1.0' }}</span>
                    </div>
                  </div>

                  <hr *ngIf="subOrder.lineItems.length > 1"/>
                </ng-container>

                <!--              TODO: hide this for marketplace-->
                <!--              <div class="complain">-->
                <!--                <p class="complain-text"><i class="material-icons info_outline"></i>Maksimal pengajuan komplain 3 hari-->
                <!--                  terhitung dari pesanan diterima</p>-->
                <!--              </div>-->
                <div class="button-bottom-div" *ngIf="subOrder.status === 'complete'">
                  <!--                <button class="transparent-button">Komplain</button>-->
                  <!--                <button class="pink-button margin-left-24">Selesai</button>-->
                  <button class="transparent-button">Tulis Ulasan</button>
                  <button class="pink-button margin-left-24">Beli Lagi</button>
                </div>

              </ng-container>

            </div>
          </ng-container>

          <div class="order-transaction-box">
            <table>
              <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{{order.subtotalCost | currency:'Rp ':'symbol':'1.0'}}</td>
              </tr>
              <tr>
                <td>Total Pengiriman</td>
                <td>{{order.shippingCost | currency:'Rp ':'symbol':'1.0'}}</td>
              </tr>
              <tr>
                <!-- TODO: from where?-->
                <td>Asuransi Pengiriman</td>
                <td>Rp 0</td>
              </tr>
              <tr>
                <td>Potongan</td>
                <td>- {{order.discount | currency:'Rp ':'symbol':'1.0'}}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0">
                  <hr/>
                </td>
              </tr>
              <tr>
                <td>Total Transaksi</td>
                <td class="total">{{order.orderPayment.amount | currency:'Rp ':'symbol':'1.0'}}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="order-address-box">
            <p>Alamat Pengiriman</p>
            <ng-container *ngIf="order.orderAddress">
              <p class="name">{{order.orderAddress.shipToName | titlecase}}</p>
              <p>{{order.orderAddress.street}}</p>
              <p>{{order.orderAddress.district}} - {{order.orderAddress.city}}</p>
              <p>{{order.orderAddress.state}} - {{order.orderAddress.zipcode}}</p>
              <p>{{order.orderAddress.phoneNumber}}</p>
            </ng-container>
          </div>

          <button
            class="continue-order"
            (click)="onContinueOrder()"
            *ngIf="
              (order.status === 'unpaid' && !order.orderPayment.meta) ||
              order.orderPayment.paymentGateway.type !== 'manual_transfer'
            "
          >
            Lanjutkan Pembayaran
          </button>

          <button class="cancel-order"
                  (click)="onCancelOrder()"
                  *ngIf="order.status === 'unpaid'">
            Batalkan Pesanan
          </button>

          <button class="confirm-order"
                  (click)="redirectToOrderConfirm()"
                  *ngIf="canConfirmPayment(order)">
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>
    </div>
    <!--        <pre><code>{{ order|json }}</code></pre>-->

  `,
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  showTrackOrder = false;
  hideTrackOrder = false;
  shipmentHistory = false;
  status: Choice[];
  bank: AbstractBank;
  mobile = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderShipmentService: OrderShipmentService,
    private service: CheckoutService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (window.screen.width <= 500) { // 768px portrait
      this.mobile = true;
    }

    this.route.data.subscribe((data: { order: Order, status: Choice[] }) => {
      this.order = data.order;
      this.status = data.status;

      const childrenLength = data.order.children.length;
      let index;
      for (index = 0; index < childrenLength; index++) {
        const dataLength = this.order.children[index].data.length;
        const data = this.order.children[index].data;
        let i;
        for (i = 0; i < dataLength; i++) {
          const url = data[i].shipmentHistory ? data[i].shipmentHistory.href : null;
          const shipmentHistoryData = data[i].shipmentHistory;

          if (url) {
            this.showTrackOrder = true;
            this.orderShipmentService.fetchShipmentById(url).subscribe(resp => {
              shipmentHistoryData.airwayBillNumber = resp.body.airwayBillNumber;
              shipmentHistoryData.histories = resp.body.histories;
              shipmentHistoryData.histories.reverse();
              shipmentHistoryData.shippingLabelUrl = resp.body.shippingLabelUrl;
              shipmentHistoryData.logisticsPartner = resp.body.logisticsPartner;
            });
          }
        }
      }

      this.bank = getBank(this.payment);
    });
  }

  copyToClipboard(vaNumber: string) {
    if (vaNumber) {
      document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (vaNumber));
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');
      alert('va copied!');
    }
  }

  changeSource($event: any) {
    $event.target.src = `/assets/default-image.png`;
  }

  trackOrderToggle() {
    this.showTrackOrder = !this.showTrackOrder;
    this.hideTrackOrder = !this.hideTrackOrder;
    this.shipmentHistory = !this.shipmentHistory;
  }

  getStatusName(status: string) {
    const result = this.status.find(obj => {
      return obj.value === status;
    });
    return result.displayName;
  }

  detectScreenSize() {
    this.mobile = window.screen.width <= 500;
  }

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }

  onContinueOrder(): void {
    this.service.fetchPaymentRequest2(this.order.orderNumber).subscribe(resp => {
      if (resp.status === 200) {
        window.location.href = resp.body.redirectUrl;
      }
    }, error => this._handleError(error));
  }
  onCancelOrder(): void {
    // this.service.cancelPayment(this.order.orderNumber).subscribe(resp => {
    //   this._refreshPage();
    // }, error => error => this._handleError(error));
  }

  // Messages
  showSuccessMessage(msg: string = "") {
    const message = msg ? msg : "Profile berhasil diperbaharui.";
    const status = 201;

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      panelClass: ["mt-alert--is-primary", "mt-alert--has-text-centered"],
    });
  }
  showErrorMessage(msg: string = "") {
    const message = msg ? msg : "Terjadi kesalahan !!";
    const status = 400;

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }

  get payment(): any {
    return this.order.orderPayment.paymentGateway;
  }
  isCCPayment(): boolean {
    // todo: need some code or slug (?)
    return this.payment.name === 'Kartu Kredit';
  }

  /* check can show a button "confirmation" or not */
  canConfirmPayment(order: Order): boolean {
    return (
      order.orderPayment.paymentGateway.type === 'manual_transfer' &&
      (order.status === 'unpaid' || order.status === 'waiting')
    );
  }

  // Error
  _handleError(error) {
    if (error.status === 404) {
      this.showErrorMessage("Order is Not Found");
      this.router.navigate(['profile', 'orders']);
    } else if (error.status === 409) {
      this.showErrorMessage("Payment already Paid");
      this.router.navigate(['profile', 'orders', this.order.orderNumber]);
    } else if (error.status === 400) {
      this.showErrorMessage("Order has been paid and utilized");
      this.router.navigate(['profile', 'orders', this.order.orderNumber]);
    }
  }

  _refreshPage(): void {
    this.router.navigate(["./"], {
      queryParamsHandling: "merge",
      relativeTo: this.route,
    });
  }

  redirectToOrderConfirm(): void {
    this.router.navigate(['/order-confirm']);
  }
}
