import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Order, OrderList} from '@app/models/order';
import {PagedResponse} from '@app/core/pagination';
import {OrderHistoryService} from "@app/services";
import {DaterangepickerDirective} from "ngx-daterangepicker-material";
import * as moment from 'moment';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {Choice} from "@app/models/drf";

@Component({
  selector: 'app-order-history-list',
  template: `
    <div class="parent-order-div">
      <!-- Search and filter modal for mobile version -->
      <div id="searchFilterModal" class="search-filter-modal">
        <div class="sf-modal-content">
          <span class="sf-modal-close" (click)="toggleSearchFilterModal('close')">&times;</span>
          <p class="search-filter-modal-title">{{ searchFilterModalTitle }}</p>
          <input *ngIf="searchFilterModalMode === 'search'" [(ngModel)]="searchString" type="text"
                 class="sf-search-input"
                 placeholder="Cari nama produk, nomor order"/>
          <div *ngIf="searchFilterModalMode === 'filter'" class="sf-filter-date">
            <input
              matInput
              ngxDaterangepickerMd
              showCancel="true"
              showClearButton="true"
              placeholder="Atur tanggal"
              [(ngModel)]="selected"
              [showDropdowns]="true"
              [lockStartDate]="false"
              [customRangeDirection]="false"
              [locale]="{ applyLabel: 'Done', clearLabel: 'Clear', firstDay: 1, format: 'DD/MM/YY' }"
            />
            <i class="material-icons icon" (click)="openCalendar()">calendar_today</i>
          </div>
          <select [(ngModel)]="selectedStatus" *ngIf="searchFilterModalMode === 'filter'" class="sf-order-status"
                  name="orderStatus" id="orderStatus">
            <option value="all">Semua Pesanan</option>
            <option value="unpaid">Menunggu Konfirmasi</option>
            <option value="paid">Pesanan Dibayar</option>
            <option value="ready">Pesanan Disiapkan</option>
            <option value="shipped">Pesanan Dikirim</option>
            <option value="complete">Pesanan Selesai</option>
            <option value="cancelled">Pesanan Dibatalkan</option>
            <option value="refunded">Pesanan Direfund</option>
          </select>
          <button class="sf-modal-button"
                  (click)="triggerSfButtonModal()">{{ searchFilterModalButton }}</button>
        </div>

      </div>
      <div class="title-big">Daftar Transaksi</div>
      <div class="filter-box">
      <span class="search-input" (click)="toggleSearchFilterModal('search')">
        <input type="text" placeholder="Cari nama produk, nomor order" [(ngModel)]="searchString" #searchInput/>
        <i class="material-icons icon-search">search</i>
      </span>
        <button *ngIf="mobile" class="filter-btn" (click)="toggleSearchFilterModal('filter')">Filter</button>
        <span class="filter-date" *ngIf="!mobile">
        <input matInput
               ngxDaterangepickerMd
               showCancel="true"
               showClearButton="true"
               placeholder="Atur tanggal"
               [(ngModel)]="selected"
               [showDropdowns]="true"
               [lockStartDate]="false"
               [customRangeDirection]="false"
               [locale]="{ applyLabel: 'Done', clearLabel: 'Clear', firstDay: 1, format: 'DD/MM/YY' }"
               (ngModelChange)="ngModelChange($event)"
               (change)="filterCalendar()"/>
        <i class="material-icons icon" (click)="openCalendar()">calendar_today</i>
      </span>
        <select [(ngModel)]="selectedStatus" class="order-status-selection" name="orderStatus" id="orderStatus"
                (change)="filterStatus()" *ngIf="!mobile">
          <option value="all">Semua Pesanan</option>
          <option value="unpaid">Menunggu Konfirmasi</option>
          <option value="paid">Pesanan Dibayar</option>
          <option value="ready">Pesanan Disiapkan</option>
          <option value="shipped">Pesanan Dikirim</option>
          <option value="complete">Pesanan Selesai</option>
          <option value="cancelled">Pesanan Dibatalkan</option>
          <option value="refunded">Pesanan Direfund</option>
        </select>
        <select class="sort-order" name="orderSore" id="orderSort" (change)="sort($event)">
          <option value="-created">Terbaru</option>
          <option value="-order_payment__amount">Nilai tertinggi</option>
        </select>
      </div>
      <div *ngIf="orderData.length > 0"
           class="search-results"
           infiniteScroll
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="50"
           (scrolled)="onScroll()">
        <ng-container *ngFor="let data of orderData; let i = index">
          <ng-container *ngIf="data.featuredProduct !== null">
            <div class="order-box">
              <table>
                <tr>
                  <td class="table-title">Nomor Order</td>
                  <td class="table-title not-mobile">Tanggal Transaksi</td>
                  <td class="table-title not-mobile">Total Item</td>
                  <td class="table-title not-mobile">Total Transaksi</td>
                  <td rowspan="2">
                    <span *ngIf="data.status === 'unpaid'" class="order-status-text unpaid">
                      {{getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'paid'" class="order-status-text paid">
                      {{ getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'ready'" class="order-status-text paid">
                      {{ getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'shipped'" class="order-status-text paid">
                      {{ getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'cancelled'" class="order-status-text cancel">
                      {{ getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'complete'" class="order-status-text done">
                      {{ getStatusName(data.status) }}
                    </span>
                    <span *ngIf="data.status === 'refunded'" class="order-status-text cancel">
                      {{ getStatusName(data.status) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td [ngStyle]="{'width': mobile ? '60%': '30%' }">{{ data.orderNumber }}</td>
                  <td width="20%" *ngIf="!mobile">{{ data.created | date: 'dd MMM yyyy | HH:mm' }}</td>
                  <td width="15%" *ngIf="!mobile">{{ data.totalItems }}</td>
                  <td width="20%" *ngIf="!mobile">
                    {{ (data.orderPayment?.amount || 0) | currency:'Rp ':'symbol':'1.0' }}
                  </td>
                </tr>
              </table>
              <hr/>

              <div class="product-section">
                <div class="image-div">
                  <img class="product-img" width="78" height="78" src="{{ data.featuredProduct.product.image }}"
                       (error)="changeSource($event)"
                       alt="product-image"/>
                </div>
                <div class="description-div">
                  <p class="product-title">{{ data.featuredProduct.product.name }}</p>
                  <span class="product-qty">QTY {{ data.featuredProduct.quantity }}</span>
                  <span class="product-price">{{ data.featuredProduct.price | currency:'Rp ':'symbol':'1.0' }}</span>
                </div>
                <div class="button-div" *ngIf="!mobile">
                  <button><a style="text-decoration: none; color: #333333" [routerLink]="[data.orderNumber]">Lihat
                    Detail</a></button>
                </div>
              </div>
              <div class="button-div" *ngIf="mobile" [routerLink]="[data.orderNumber]">
                <button><a style="text-decoration: none; color: #333333">Lihat
                  Detail</a></button>
              </div>
            </div>
          </ng-container>
        </ng-container>
      </div>
      <div *ngIf="orderData.length === 0" class="no-order-div">
        <img class="not-order-img" src="/assets/order-empty.png" alt="not-order-data-img"/>
        <p class="no-order-label">Tidak ada transaksi</p>
      </div>
    </div>
  `,
  styleUrls: ['./order-list.component.scss']
})
export class OrderHistoryListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(DaterangepickerDirective, {static: true})
  pickerDirective: DaterangepickerDirective;
  // @ViewChild('searchFilterModal') searchFilterModal: ElementRef;

  selected: any;

  orderData: OrderList[] = []
  pageNum = 0;
  page: PagedResponse<Order>;
  // displayedColumns = ['orderNumber', 'status', 'grandTotal', 'created'];

  query: string = '';
  status: Array<Choice>;
  mobile: boolean = false;

  searchFilterModal: any;
  searchFilterModalTitle: string;
  searchFilterModalMode: string; // search or filter mode
  searchFilterModalButton: string;

  searchString: string = '';
  selectedStatus: string = 'all';


  constructor(
    private route: ActivatedRoute,
    private orderHistoryService: OrderHistoryService,
    private router: Router,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    if (window.screen.width <= 500) { // 768px portrait
      this.mobile = true;
    }

    this.route.data.subscribe((data: { page: PagedResponse<OrderList>, status: Choice[] }) => {
      // this.page = data.page;
      this.pageNum = data.page.pageNumber;
      this.status = data.status;

      this.orderData = data.page.entities
    });
  }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();

    if (this.searchFilterModal.style.display === 'block') {
      return this.searchFilterModal.style.display = 'none';
    }
  }

  ngAfterViewInit() {
    const el = this.el.nativeElement;
    this.searchFilterModal = el.querySelector('#searchFilterModal');

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {

          this.search();
        })
      )
      .subscribe();
  }

  onScroll() {
    // TODO: [WIP] on scroll with query param , and simplified this method
    let search = '', status = '', ordering = '', created = '', created__gte = '', created__lte = '';
    const queryIndex = this.router.url.indexOf('?')
    if (queryIndex > 0) {
      let query = this.router.url.slice(queryIndex + 1)

      if (query.includes('&')) {
        let splittedQuery = query.split('&')

        for (let i = splittedQuery.length; i--;) {
          if (splittedQuery[i].indexOf("search") >= 0) {
            search = this.getQueryParamValue(splittedQuery[i], '=');
          }

          if (splittedQuery[i].indexOf("status") >= 0) {
            status = this.getQueryParamValue(splittedQuery[i], '=');
          }

          if (splittedQuery[i].indexOf("ordering") >= 0) {
            ordering = this.getQueryParamValue(splittedQuery[i], '=');
          }

          if (splittedQuery[i].indexOf("created__gte") >= 0) {
            created__gte = this.getQueryParamValue(splittedQuery[i], '=');
          }

          if (splittedQuery[i].indexOf("created__lte") >= 0) {
            created__lte = this.getQueryParamValue(splittedQuery[i], '=');
          }
        }
      } else {
        if (query.indexOf("search") >= 0) {
          search = this.getQueryParamValue(query, '=');
        }

        if (query.indexOf("status") >= 0) {
          status = this.getQueryParamValue(query, '=');
        }

        if (query.indexOf("ordering") >= 0) {
          ordering = this.getQueryParamValue(query, '=');
        }

        if (query.indexOf("created__gte") >= 0) {
          created__gte = this.getQueryParamValue(query, '=');
        }

        if (query.indexOf("created__lte") >= 0) {
          created__lte = this.getQueryParamValue(query, '=');
        }
      }

    }
    let page = this.pageNum + 1
    this.orderHistoryService.fetchListForCurrentUser(
      search, page, created, created__gte, created__lte, status, ordering
    ).subscribe(resp => {
      this.pageNum = resp.pageNumber;
      this.addNewOrderData(resp.entities);
    })
  }

  addNewOrderData(orderData) {
    let orderDataLength = orderData.length;
    let i: number;
    for (i = 0; i < orderDataLength; i++) {
      this.orderData.push(orderData[i]);
    }
  }

  changeSource($event: any) {
    $event.target.src = `/assets/default-image.png`;
  }

  openCalendar() {
    this.pickerDirective.open();
  }

  ngModelChange(e): void {

  }

  filterCalendar() {
    let queryParams;

    if (this.selected && this.selected.startDate && this.selected.endDate) {
      let startDate = this.selected.startDate.startOf("minute").toISOString();
      let endDate = this.selected.endDate.startOf("minute").toISOString();
      queryParams = {created__gte: startDate, created__lte: endDate};
    } else {
      queryParams = {created__gte: null, created__lte: null};
    }

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }


  sort($event: any) {
    let queryParams = {ordering: $event.target.value};

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'// remove to replace all query params by provided
    });
  }

  filterStatus() {
    let queryParams = {status: this.selectedStatus};
    if (this.selectedStatus === 'all') {
      queryParams = {status: null}; //set null to remove query param
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'// remove to replace all query params by provided
    });
  }

  indexOfElement(string: string, separator: string) {
    return string.indexOf(separator);
  }

  getQueryParamValue(string: string, separator: string) {
    let indexOfSeparator = this.indexOfElement(string, separator);
    return string.slice(indexOfSeparator + 1)
  }

  getStatusName(status: string) {
    let result = this.status.find(obj => {
      return obj.value === status
    })
    return result.displayName;
  }

  private detectScreenSize() {
    if (window.screen.width <= 500) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  toggleSearchFilterModal(mode: string) {
    if (this.mobile) {

      mode !== 'close' ? this.searchFilterModalMode = mode : ''; //set mode for search filter  modal
      this.searchFilterModalTitle = this.capitalizeOneWord(mode)
      this.setSfModalButtonString(mode);

      if (this.searchFilterModal.style.display === 'block') {
        return this.searchFilterModal.style.display = 'none';
      }

      return this.searchFilterModal.style.display = 'block';
    }

  }

  capitalizeOneWord(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  setSfModalButtonString(mode: string) {
    if (mode === 'search') {
      this.searchFilterModalButton = 'Cari';
    } else {
      this.searchFilterModalButton = 'Pilih';
    }
  }

  triggerSfButtonModal() {
    this.toggleSearchFilterModal('close');
    if (this.searchFilterModalMode === 'search') {
      this.search()
    } else if (this.searchFilterModalMode === 'filter') {
      this.filterStatusCalendarMobile()
    }
  }

  search() {
    let queryParams: Params = {search: this.searchString};

    if (this.searchString === '') {
      queryParams = {search: null};
    }

    this.router.navigate([], {
      relativeTo: this.route, queryParams: queryParams, queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  filterStatusCalendarMobile() {
    let queryParams = {created__gte: null, created__lte: null, status: null};

    if (this.selected.startDate && this.selected.endDate) {
      let startDate = this.selected.startDate.startOf("minute").toISOString();
      let endDate = this.selected.endDate.startOf("minute").toISOString();
      queryParams.created__gte = startDate;
      queryParams.created__lte = endDate;
    }

    if (this.selectedStatus && this.selectedStatus !== 'all') {
      queryParams.status = this.selectedStatus
    }

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
