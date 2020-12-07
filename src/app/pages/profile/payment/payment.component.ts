import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from "@angular/core";
import {PagedResponse} from "@app/core/pagination";
import {ActivatedRoute, Router} from "@angular/router";
import {UserPayment} from "@app/models/customer/payment";
import {UserPaymentService} from "@app/services/user-payment.service";
import {Logger} from "@app/core";


const log = new Logger('app-user-payment');

@Component({
  selector: 'app-user-payment',
  template: `
    <div class="payment-wrapper">
      <h3>Pembayaran</h3>
      <div class="card-wrapper">
        <div class="card-list-wrapper">
          <div class="card-list" *ngFor="let userPayment of page.entities, let i = index">
            <div class="card-number-masked" [ngClass]="(i === activeListIndex)? 'active': ''"
                 (click)="setActive(i, userPayment)">
              <span class="cc-detail">
                <span class="cc-number">{{formatCardNumber(userPayment.maskedCard)}}</span>
                <img class="cc-logo-small" src="{{setLogo(userPayment.maskedCard)}}" alt="cc logo small"/>
              </span>
              <span class="cc-action">Lihat Detail</span>
            </div>
          </div>
        </div>
        <div class="card-detail"
             [ngStyle]="{'background-color': displayCardDetail && !mobile ? '#F5F5F5' : 'transparent' }">
          <ng-container *ngIf="displayCardDetail && !mobile">
            <div *ngIf="displayCardDetail" class="card-img-wrapper">
              <img class="card-sim" src="assets/user-payment/sim-1.png" alt="sim-logo"/>
              <img class="card-logo" src="{{detailLogoHref}}" alt="sim-logo"/>
              <p class="num-masked">{{currentCardDetailNumber}}</p>
              <p class="card-expired-label">month/year</p>
              <p class="card-expired-value">{{currentCardDetailMonthYear}}</p>
              <img class="card-background" src="{{detailCardBackgroundHref}}" alt="card-background"/>
            </div>
            <p class="card-detail-text">Saya telah membaca dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi
              Martha Tilaar</p>
            <button (click)="toggleDeleteModal()">Hapus</button>
          </ng-container>
        </div>
      </div>
      <div *ngIf="page.totalResults == 0" class="no-payment-wrapper">
        <img class="no-payment-img" src="assets/user-payment/no-payment-found.png" alt="no-payment-data-img"/>
        <p class="no-payment-label">Tidak ada kartu kredit yang tersimpan</p>
      </div>

      <!-- delete modal-->
      <div id="deleteModal" class="delete-modal-wrapper">
        <div class="delete-modal-content">
          <p class="delete-modal-title">Hapus Kartu Kredit</p>
          <p class="delete-modal-subtitle">Ada 1 kartu kredit yang akan dihapus</p>
          <div class="button-delete-wrapper">
            <button class="left" (click)="toggleDeleteModal()">Batal</button>
            <button class="delete" (click)="deleteCard()">Hapus</button>
          </div>
        </div>
      </div>

      <!--  mobile card detail modal-->
      <div *ngIf="mobile" id="cardDetailModal" class="card-detail-modal-wrapper">
        <div class="card-detail-modal-content">
          <span class="card-detail-modal-close" (click)="closeCardDetailModal()">&times;</span>
          <p class="card-detail-modal-title">Detail Kartu Kredit</p>
          <div class="card-detail">
            <ng-container>
              <div class="card-img-wrapper">
                <img class="card-sim" src="assets/user-payment/sim-1.png" alt="sim-logo"/>
                <img class="card-logo" src="{{detailLogoHref}}" alt="sim-logo"/>
                <p class="num-masked">{{currentCardDetailNumber}}</p>
                <p class="card-expired-label">month/year</p>
                <p class="card-expired-value">{{currentCardDetailMonthYear}}</p>
                <img class="card-background" src="{{detailCardBackgroundHref}}" alt="card-background"/>
              </div>
              <p class="card-detail-text">Saya telah membaca dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi
                Martha Tilaar</p>
              <button (click)="toggleDeleteModal()">Hapus</button>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit, AfterViewInit {
  detailLogoHref: string = '';
  detailCardBackgroundHref: string = '';
  page: PagedResponse<UserPayment>;

  displayCardDetail: boolean = false;
  currentCardDetailNumber: string = '';
  currentCardDetailMonthYear: string = '';
  activeListIndex: number;
  cardDetailInstance: UserPayment;

  // mobile mode or tablet
  mobile: boolean;

  //modal
  deleteModal: any;
  cardDetailModal: any;


  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private service: UserPaymentService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.fetchUserPayment();
    this.detectScreenSize();
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    this.deleteModal = el.querySelector('#deleteModal');
    this.cardDetailModal = el.querySelector('#cardDetailModal');
  }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  fetchUserPayment() {
    this.route.data.subscribe((data: { page: PagedResponse<UserPayment> }) => {

      this.page = data.page;
    });
  }

  getCardType(number) {
    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null)
      return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{4})/.test(number))
      return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      return "Visa Electron";

    return "";

  }

  formatCardNumber(param) {
    let formattedCardNumber = param.split('-');
    formattedCardNumber = formattedCardNumber[0] + 'XXXXXX' + formattedCardNumber[1];
    return formattedCardNumber.replace(/(.{4})/g, "$1 ")
  }

  setActive(index, userPayment: UserPayment) {

    if (this.mobile) {
      this.cardDetailModal.style.display = 'block'
    } else {
      this.displayCardDetail = true;
    }

    this.activeListIndex = index;
    this.cardDetailInstance = userPayment
    this.currentCardDetailNumber = this.formatCardNumber(userPayment.maskedCard);
    this.currentCardDetailMonthYear = this.formatCardMonthYear(userPayment.savedTokenIdExpiredAt);
    this.detailLogoHref = this.setLogo(userPayment.maskedCard);
    this.detailCardBackgroundHref = this.setCardBackground(userPayment.maskedCard);
  }

  setLogo(masked_card: string) {
    let cardType = this.getCardType(masked_card)

    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'assets/user-payment/visa-med.png';
      case 'mastercard':
        return 'assets/user-payment/mastercard-med.png';
    }
    return 'https://via.placeholder.com/35x21.png';
  }

  formatCardMonthYear(param: string) {
    let d = new Date(param);
    let month = ('0' + (d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12 and add a leading zero
    let year = d.getFullYear().toString().slice(-2);
    return `${month}/${year}`
  }

  setCardBackground(masked_card_string: string) {
    let cardType = this.getCardType(masked_card_string)

    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'assets/user-payment/visa-background-card.png';
      case 'mastercard':
        return 'assets/user-payment/mastercard-background-large.png';
    }
  }

  toggleDeleteModal() {
    if (this.mobile) {
      if (this.cardDetailModal.style.display === 'block') {
        this.cardDetailModal.style.display = 'none';
      }
    }

    if (this.deleteModal.style.display === 'block') {
      return this.deleteModal.style.display = 'none';
    }

    return this.deleteModal.style.display = 'block';
  }

  deleteCard() {
    this.service.delete(this.cardDetailInstance).subscribe(resp => {
      log.debug(resp);
      if (resp.ok) {
        this.displayCardDetail = false;
        this.refreshPayment();
        this.toggleDeleteModal();
      }
      log.debug(resp);
    })
  }

  detectScreenSize() {
    this.mobile = window.screen.width <= 500;
  }

  closeCardDetailModal() {
    return this.cardDetailModal.style.display = 'none';
  }

  refreshPayment() {
    this.router.navigate(["./"], {
      queryParams: { page: this.page?.pageNumber || 1 },
      queryParamsHandling: "merge",
      relativeTo: this.route,
    });
  }
}
