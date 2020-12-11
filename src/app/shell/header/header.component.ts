import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs';

import {Cart} from '@app/models/cart';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {CartService} from '@app/services/cart.service';
import {LocalStorage} from '@app/services/local-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SideMenuHeaderComponent} from '@app/shell/header/side-menu-header';
import {ProductsService} from '@app/services';
import {EntityToSlugPipe} from '@app/shared/utils';
import {Router} from '@angular/router';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, DoCheck {
  private static DEBOUNCE_TIMEOUT = 150;
  bodyElement: HTMLBodyElement;

  @Output() search = new EventEmitter<any>();

  @Input()
  cartCount: number;
  cartSubscription: Subscription;
  cartList = new Cart();
  matBadge: number;
  matVisibility: boolean;
  itemCount = 0;

  isMobileSearch = false;

  limit = 5;

  isActive = false;
  isEnter = false;
  historySearchStatus = false;
  searchBox = true;

  _queryText = '';

  debounceTimer: any;
  historySearch: any;
  showHistory: any;
  productSuggestion: Array<any>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private credentialsService: CredentialsService,
    private service: CartService,
    private productService: ProductsService,
    public pipe: EntityToSlugPipe,
    private localStorage: LocalStorage,
    private dialog: MatDialog,
    private router: Router,) {
  }

  ngOnInit() {
    if (this.credentialsService.isAuthenticated()) {
      this.localStorage.removeItem('cart-quantity');
      this.service.fetchCart()
        .subscribe(data => {
          this.cartList = data.body;
          for (const item of this.cartList.cartItems) {
            this.itemCount += item.quantity;
          }
          this.localStorage.setItem('cart-quantity', this.itemCount);
          this.matBadge = !!this.cartList && !!this.cartList.cartItems ? this.localStorage.getItem('cart-quantity') : 0;
          this.matVisibility = false;
        });
    }

    this.clickedInsideData();
  }

  ngDoCheck(): void {
    this.matVisibility = !this.credentialsService.isAuthenticated();
    if (this.localStorage.getItem('cart-quantity') !== null || this.localStorage.getItem('cart-quantity') !== null) {
      this.matBadge = this.localStorage.getItem('cart-quantity');
    }

    if (this.isMobileSearch) {
      this.document.body.classList.add('no-scroll');
    } else {
      if (this.document.body.classList.contains('no-scroll')) {
        this.document.body.classList.remove('no-scroll');
      }
    }
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  searchEvent($event: any) {
    this.search.emit($event);
  }

  ngAfterViewInit(): void {
    this.matBadge = this.cartCount;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.matBadge = this.cartCount;
  }

  showSideMenu() {
    this.dialog.open(SideMenuHeaderComponent, {
      width: '90%',
      height: '100%',
      position: {
        left: '0px'
      }
    });
  }


  setMobileSearch() {

    this.isMobileSearch = true;

  }

  public get queryText(): string {
    return this._queryText;
  }

  public set queryText(value: string) {
    if (value !== this.queryText) {
      this._queryText = value;
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(
      () => this.searchProducts(),
      (this.queryText) ? HeaderComponent.DEBOUNCE_TIMEOUT : 0);
  }

  changeTextInput($event: KeyboardEvent) {

    if (this.queryText.length >= 3) {
      this.searchBox = false;
    }

    if ($event.code === 'Enter') {
      // init search
      this.isEnter = true;
      this.searchBox = false;
      this.searchProducts();
    } else {
      this.isEnter = false;
    }

    if (this.queryText.length === 1) {
      this.isActive = false;
    }
  }

  clearInput() {
    this.queryText = '';
    this.isActive = false;
  }

  onPressEnter() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      delete this.debounceTimer;
    }

    if (this.queryText) {
      // set query text to local storage for history
      // redirect to PLP
      this.setItemToLocalStorage(this.queryText);
      this.router.navigate(['/products'], {queryParams: {q: this.queryText}});
      this.searchBox = true;
      this.isMobileSearch = false;
    }
  }

  searchProducts() {
    this.productSuggestion = [];

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      delete this.debounceTimer;
    }

    if (this.queryText.length >= 3 && !this.isEnter) {
      const params = {
        'q': this.queryText,
        'limit': this.limit
      }
      this.productService.fetchBySearchBox(params).subscribe(result => {
        const resultBody = result.body;
        const data = resultBody.data;

        if (data.length !== 0 && !this.isEnter) {
          this.searchBox = false;
          this.productSuggestion = data;
          this.getItemFromLocalStorage('search');
          this.historySearchStatus = true;
        } else {
          this.productSuggestion = [];
        }
      })
    } else {
      this.searchBox = true;
      this.historySearchStatus = false;
      this.productSuggestion = [];
    }
  }

  highlight(name: string) {
    if (!this.queryText) {
      return name;
    }

    return name.replace(new RegExp(this.queryText, 'gi'), match => {
      return '<strong>' + match + '</strong>';
    });
  }

  onCloseSuggestion(b: boolean, q?: string) {
    this.searchBox = true;
    this.queryText = b ? this.queryText : '';
    if (q) {
      this.queryText = q;
    }
    this.isActive = false;
    this.isMobileSearch = false;
    this.productSuggestion = [];
  }

  setItemToLocalStorage(queryText: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (!queryText.replace(/\s/g, '').length) {
        return false;
      } else {
        const searchDataHistory = this.getItemFromLocalStorage('search');
        if (searchDataHistory) {
          const now = new Date();
          searchDataHistory.data = searchDataHistory.data.concat({
            key: queryText,
            created_at: now
          });
          this.storeToLocalStorage(searchDataHistory);
        } else {
          const now = new Date();
          const time = now.getTime();
          const expireTime = time + 1000 * 36000;

          this.historySearch = [
            {
              key: queryText,
              created_at: now
            }
          ];
          const toLocalStorage = {
            expires: expireTime,
            data: this.historySearch
          };
          this.storeToLocalStorage(toLocalStorage);
        }
      }
    }
  }

  getItemFromLocalStorage(search: string) {
    if (isPlatformBrowser(this.platformId)) {
      const dataFromStorage = localStorage.getItem(search);
      if (dataFromStorage) {
        const resultJson = JSON.parse(dataFromStorage);
        if (resultJson) {
          return resultJson;
        }
      }
    }
  }

  storeToLocalStorage(toLocalStorage: { expires: number; data: any }) {
    if (isPlatformBrowser(this.platformId)) {
      if (toLocalStorage) {
        toLocalStorage.data = this.uniqueByKey(toLocalStorage.data, 'key');
        if (toLocalStorage.data.length >= this.limit) {
          toLocalStorage.data = toLocalStorage.data.slice(Math.max(toLocalStorage.data.length - this.limit, 1));
        }
        this.historySearch = toLocalStorage.data;

        localStorage.setItem('search', JSON.stringify(toLocalStorage));
        const searchDataHistory = this.getItemFromLocalStorage('search');
        if (searchDataHistory) {
          if (searchDataHistory.data.length > 0) {
            this.historySearch = searchDataHistory.data;
            this.searchBox = false;
            this.historySearchStatus = true;
            this.sortHistory();
          } else {
            this.searchBox = true;
            this.historySearch = [];
            this.sortHistory();
            this.historySearchStatus = false;
          }
        }
      }
    }
  }

  uniqueByKey(data: any, key: string) {
    return data.length > 0 && key ? data.filter((item) => {
      if (data[item[key]]) {
        return false;
      }
      data[item[key]] = true;
      return true;
    }) : [];
  }

  clickedInsideData($event?: MouseEvent) {

    if (isPlatformBrowser(this.platformId)) {
      if (this.productSuggestion && this.queryText.length >= 3) {
        if (this.productSuggestion.length > 0) {
          this.searchBox = false;
          this.historySearchStatus = false;
          return false;
        }
      }
      const searchDataHistory = this.getItemFromLocalStorage('search');
      if (searchDataHistory) {
        if (searchDataHistory.data.length > 0) {
          this.historySearch = searchDataHistory.data;
          this.searchBox = false;
          this.historySearchStatus = true;
          this.sortHistory();
        } else {
          this.searchBox = true;
          this.historySearch = [];
          this.sortHistory();
          this.historySearchStatus = false;
        }
      }
    }
  }

  sortHistory() {
    const {historySearch} = this;
    this.showHistory = historySearch.length > 0 ?
      historySearch.sort((d1, d2) => new Date(d2.create_at).getTime() - new Date(d1.create_at).getTime()) : [];
  }

  clickedInside() {
    if (!this.searchBox) {
      this.searchBox = true;
      this.isMobileSearch = false;
    }
  }

  removeHistorySearch() {
    this.historySearch = [];
    this.showHistory = [];
    this.searchBox = false;
    this.historySearchStatus = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('search');
    }
  }

  backButton() {
    this.isMobileSearch = false;
  }
}
