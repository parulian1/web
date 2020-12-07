import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {LocalStorage, ProductsService} from '@app/services';
import {EntityToSlugPipe} from '@app/shared/utils';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  private static DEBOUNCE_TIMEOUT = 150;

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
    private service: ProductsService,
    public pipe: EntityToSlugPipe,
    private localStorage: LocalStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.searchBox = true;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._queryText = queryParam.q || '';
    });
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
      (this.queryText) ? SearchBarComponent.DEBOUNCE_TIMEOUT : 0);
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
      this.service.fetchBySearchBox(params).subscribe(result => {
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
    this.isActive = false;
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

  clickedInsideData($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

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
    }
  }

  removeHistorySearch() {
    this.historySearch = [];
    this.searchBox = false;
    this.historySearchStatus = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('search');
      this.getItemFromLocalStorage('search');
    }
  }
}
