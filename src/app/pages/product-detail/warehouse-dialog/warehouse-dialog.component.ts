import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProductDetail} from '@app/models/product-detail';
import {Store} from '@app/models/store';
import {StoreService} from '@app/services';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {MatSelectChange} from "@angular/material/select";
import {MatRadioChange} from "@angular/material/radio";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss']
})
export class WarehouseDialogComponent implements OnInit {

  listProvinces: Set<string>;
  listWarehouse: Store[];
  preferredWarehouse: Store;
  updatedPreferredWarehouse: Store;
  selectedWarehouse: string;
  isChecked = false;
  isDisabled = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Store[],
              private service: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isDisabled = true;
    this.listProvinces = new Set(this.data.map(m => m.address.province).sort());

    this.preferredWarehouse = this.service.preferredStore;

    this.selectedWarehouse = this.preferredWarehouse.address.province;

    this.listWarehouse = this.data.filter(m => m.address.province === this.selectedWarehouse);
  }

  currentProvince($event: MatSelectChange) {

    this.listWarehouse = this.data.filter(m => m.address.province === $event.value);
  }

  chosenWarehouse(chosenStore: Store) {

    this.updatedPreferredWarehouse = chosenStore;
    this.isDisabled = !chosenStore;
  }

  updatePreferredWarehouse() {

    this.service.preferredStore = this.updatedPreferredWarehouse;
    this.router.navigateByUrl(decodeURIComponent(this.router.url));
  }
}
