import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ResellerCatalogItem } from "@app/models";
import { ResellerSavedCatalogService } from "@app/services";
import { PagedResponse } from "@app/core/pagination";
import { ResellerSavedCatalog } from "@app/models/reseller/reseller-saved-catalog";
import { ResellerSavedCatalogItem } from "@app/models/reseller/reseller-saved-catalog-item";


@Component({
  selector: 'app-saved-catalog-list',
  templateUrl: './saved-catalog-list.html',
  styleUrls: ['./saved-catalog-list.scss'],
})
export class SavedCatalogListComponent implements OnInit {

  page: PagedResponse<ResellerSavedCatalog>;
  isSelectAll: boolean = false;
  selectedCatalogItems: ResellerCatalogItem[] = [];

  constructor(private route: ActivatedRoute,
              private resellerSavedCatalogService: ResellerSavedCatalogService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { page: PagedResponse<ResellerSavedCatalog> }) => {
      this.page = data.page;
    });
  }

  getFirstProduct(catalogItems: Array<ResellerSavedCatalogItem>) {
    if (catalogItems.length > 0) {
      return catalogItems[0].product;
    }
    return null;
  }

  getFirstProductImage(catalogItems: Array<ResellerSavedCatalogItem>): string {
    if (!!this.getFirstProduct(catalogItems)) {
      if (this.getFirstProduct(catalogItems).media.length > 0) {
        return this.getFirstProduct(catalogItems)?.media[0].image;
      }
    }
    return "";
  }

}
