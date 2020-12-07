import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Store} from '@app/models/store';
import {StoreService} from '@app/services';
import {MatDialog} from '@angular/material/dialog';
import {ProvinceDialogComponent} from '@app/pages/store/province-dialog';

/**
 * Allows the user to filter the displayed stores based on province.
 */
@Component({
  selector: 'app-store-province-selector',
  templateUrl: './store-province-selector.component.html',
  styleUrls: ['./store-province-selector.component.scss']
})
export class StoreProvinceSelectorComponent implements OnInit {

  allProvinceNames: Set<string>;
  preferredStore: Store = null;
  currentProvince: string;

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { stores: Store[] }) => {
      this.allProvinceNames = new Set(data.stores.map(e => e.address.province).sort());
    });

    this.route.paramMap.subscribe((params) => {
      this.currentProvince = params.get('current-state');
    });

    if (this.storeService.preferredStore) {
      this.preferredStore = this.storeService.preferredStore;
    }

  }

  selectProvince() {
    const dialog = this.dialog.open(ProvinceDialogComponent, {
      data: {
        allProvinces: this.allProvinceNames,
        selected: this.currentProvince
      },
      width: '100%'
    });
  }
}
