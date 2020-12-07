import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {StoreService} from "@app/services";
import {Store} from "@app/models/store";

/**
 * Shows the user's current preferred store (i.e. the store which will be used when
 * adding items to the user's basket).
 *
 * Clicking this component will navigate the user to a page to allow them to select
 * a new store as their preferred store.  When directing to the store-selection
 * component, a 'next' parameter will be appended (set to the current URL) to allow
 * the user to be redirected back to their current page after changing the store.
 *
 * This component is intended to be displayed in the header (across all/most pages).
 */
@Component({
  selector: 'app-current-store',
  templateUrl: './current-store.component.html',
  styleUrls: ['./current-store.component.scss'],
})
export class CurrentStoreComponent implements OnInit, DoCheck {

  allStores: Array<Store> = [];
  preferredStore: Store = null;

  constructor(private storeService: StoreService,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit(): void {
    this.storeService.getAll().subscribe(stores => {
      this.allStores = stores;

      if (!this.storeService.preferredStore) {
        this.storeService.preferredStore = (!!this.allStores.length) ? this.allStores[0] : null;
      }

      this.preferredStore = this.storeService.preferredStore;
    });
  }

  ngDoCheck(): void {
    if (this.storeService.preferredStore) {
      this.preferredStore = this.storeService.preferredStore;
    }
  }

  goToStore(): void {
    if (localStorage.getItem('store:previous')) {
      const previous = localStorage.getItem('store:previous');
      localStorage.removeItem('store:previous');
      this.router.navigate([previous]);

    } else {
      localStorage.removeItem('store:previous');
      this.router.navigate(['/store'], {
        queryParams: { 'next': this.router.url }
      });
    }
  }
}
