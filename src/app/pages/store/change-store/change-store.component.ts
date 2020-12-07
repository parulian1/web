import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {StoreService} from "@app/services";
import {Store} from "@app/models/store/store";

/**
 * Allows the user to change their preferred store.
 */
@Component({
  selector: 'app-store',
  templateUrl: './change-store.component.html',
  styleUrls: ['./change-store.component.scss']
})
export class ChangeStoreComponent implements OnInit, OnDestroy {

  allStores: Array<Store> = [];
  availableStores: Array<Store> = [];
  currentProvince: string = null;
  nextUrl: string;
  hasPrevious: boolean = false;

  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {stores: Store[]}) => {
      this.allStores = data.stores;

      this.route.paramMap.subscribe((params) => {
        this.currentProvince = params.get('current-state');
        this.availableStores = this.allStores.filter(e => e.address.province === this.currentProvince);

        if (!this.currentProvince) {
          this.router.navigate(
            [this.storeService.preferredStore.address.province],
            {
              relativeTo: this.route,
            });
        }
      });
    });

    this.route.queryParamMap.subscribe((params) => {

      /* Condition to toggle change store page */
      if (params.get('next') && !localStorage.getItem('store:previous')) {
        localStorage.setItem('store:previous', params.get('next'));
      }
      if (localStorage.getItem('store:previous')) {
        this.hasPrevious = true;
      }

      this.nextUrl = params.get('next') ?? '/'
    });
  }

  ngOnDestroy() {
    /* force remove store:previous  */
    if (this.hasPrevious && !this.router.url.includes('/store')) {
      localStorage.removeItem('store:previous');
    }
  }

  /**
   * Changes the user's preferred store and navigates them back to the
   * previous page they were viewing.
   *
   * @param store The store to be set at the user's preferred store.
   */
  setPreferredStore(store: Store) {
    this.storeService.preferredStore = store;
    this.router.navigateByUrl(decodeURIComponent(this.nextUrl));
  }
}
