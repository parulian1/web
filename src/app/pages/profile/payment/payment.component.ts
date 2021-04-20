import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { PagedResponse } from "@app/core/pagination";
import { ActivatedRoute, Router } from "@angular/router";
import { UserPayment } from "@app/models/customer/payment";
import { UserPaymentService } from "@app/services/user-payment.service";
import { ConfigService, Logger } from "@app/core";
import { Configuration } from "@app/models";


const log = new Logger('app-user-payment');

@Component({
  selector: 'app-user-payment',
  templateUrl: './payment-component.html',
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

  config: Configuration;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private service: UserPaymentService,
    private router: Router,
    private appConfigService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
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
    return 'assets/defaults/card.png';
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
      this.displayCardDetail = false;
      this.refreshPayment();
      this.toggleDeleteModal();
    }, error => {
      log.warn('error happens', error);
      alert('can\'t delete credit card, contact admin for detail.');
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
