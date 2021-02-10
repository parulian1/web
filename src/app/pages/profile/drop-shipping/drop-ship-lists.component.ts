import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetail } from '@app/models/product-detail';
import { ProductsService, ResellerCatalogService } from '@app/services';
import { ResellerCatalog, ResellerCatalogItem, ResellerSavedCatalog } from '@app/models';
import { getSlugFromHref } from '@app/shared/helpers';
import { ResellerSavedCatalogService } from '@app/services/reseller/reseller-saved-catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { Logger } from '@app/core';
import { ResponsiveBreakpointsService } from '@app/core/responsive-breakpoints';
import { DialogSaveCatalogComponent } from '@app/pages/profile/drop-shipping/saved-catalog';
import { OnboardingService } from '@app/services/onboarding.service';
import { OnboardingDialogComponent } from '@app/shared/onboarding-dialog';
import { CookieService } from '@app/services/cookie.service';

const log = new Logger('DropShipping');

@Component({
  selector: 'app-drop-ship-lists',
  templateUrl: './drop-ship-list.html',
  styleUrls: ['./drop-ship.scss'],
})
export class DropShipListsComponent implements OnInit {

  resellerCatalog: ResellerCatalog;
  isSelectAll = false;
  selectedCatalogItems: ResellerCatalogItem[] = [];

  constructor(private route: ActivatedRoute, private resellerCatalogService: ResellerCatalogService,
              private resellerSavedCatalogService: ResellerSavedCatalogService,
              private productService: ProductsService,
              private onboardingService: OnboardingService,
              public dialog: MatDialog,
              public responsiveService: ResponsiveBreakpointsService,
              public cookieService: CookieService
  ) {
  }

  get selectedCatalog(): number {
    return this.selectedCatalogItems.length;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.resellerCatalog = data.resellerCatalog;
    });

    this.fetchOnboarding();
  }

  fetchCatalog() {
    this.resellerCatalogService.fetchCatalog().subscribe((resp) => {
      this.resellerCatalog = resp;
    });
  }

  removeProduct(p: ResellerCatalogItem) {
    this.resellerCatalogService.removeCartItem(getSlugFromHref(p.href)).subscribe((resp) => {
      if (resp.status === 204) {
        alert(`Product ${p.product.name} succesfully removed`);
      }
    }, (error) => {
      alert(`Failed to remove ${p.product.name}`);
    });

    this.fetchCatalog();
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    this.selectProduct()
  }

  getIsSelectAll() {
    this.isSelectAll = this.resellerCatalog.resellerCatalogItems.length === this.selectedCatalogItems.length;
    return this.isSelectAll && this.selectedCatalogItems.length > 0;
  }

  selectProduct(resellerCatalogItem?: ResellerCatalogItem) {
    if (!resellerCatalogItem) {
      if (!this.isSelectAll) {
        this.selectedCatalogItems = [];
      } else {
        this.resellerCatalog.resellerCatalogItems.forEach((catalogItem) => {
          if (this.selectedCatalogItems.indexOf(catalogItem) === -1) {
            this.selectedCatalogItems.push(catalogItem);
          }
        });
      }
    } else {
      const indexResellerCatalogItem = this.selectedCatalogItems.indexOf(resellerCatalogItem);
      if (indexResellerCatalogItem !== -1) {
        this.selectedCatalogItems.splice(indexResellerCatalogItem, 1);
        this.isSelectAll = false;
      } else {
        this.selectedCatalogItems.push(resellerCatalogItem);
      }
    }

  }

  downloadPdf(filePath: string) {
    window.open(filePath).print();
  }

  saveAsSavedCatalog(catalogName: string) {
    if (this.selectedCatalogItems.length > 0) {
      this.resellerSavedCatalogService.createNewCatalogWithSelectedItem(this.createPayload(catalogName)).subscribe(
        (resp) => {
          if (resp.status === 201) {
            const newCatalog: ResellerSavedCatalog = resp.body;
            this.downloadPdf(newCatalog.pdf);
          }
        }, (error) => {
          log.error(error.error.message);
        });
    }
  }

  updateCatalogAndSaveAsNewSavedCatalog() {
    this.updateCatalog();
    const dialogRef = this.dialog.open(DialogSaveCatalogComponent, {
      data: {catalogName: null},
      width: '564px',
      height: '226px',
      panelClass: 'save-catalog-form'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.saveAsSavedCatalog(result);
      }
    });
  }

  updateCatalog() {
    this.selectedCatalogItems.forEach((item) => {
      this.resellerCatalogService.updateCatalog(getSlugFromHref(item.href), item.quantity, item.price).subscribe(
        (resp) => {
        },
        (error) => {
          log.debug()
        });
    });
  }

  createPayload(catalogName: string) {
    const savedCatalogItems = [];
    this.selectedCatalogItems.forEach((catalogItem) => {
      savedCatalogItems.push({
        product: {
          name: catalogItem.product.name,
          href: catalogItem.product.href
        },
        warehouse: {
          name: catalogItem.warehouse.name,
          href: catalogItem.warehouse.href
        },
        quantity: catalogItem.quantity,
        price: catalogItem.price,
      })
    });
    const payload = {
      name: catalogName,
      items: savedCatalogItems,
      href: ''
    };
    return payload;
  }

  getIsChecked(catalogItem: ResellerCatalogItem) {
    return this.selectedCatalogItems.indexOf(catalogItem) !== -1;
  }

  getProductAttributes(catalogItem: ResellerCatalogItem) {
    let product: ProductDetail;
    this.productService.fetchProduct(getSlugFromHref(catalogItem.product.href)).subscribe((resp) => {
      product = resp.body;
    });
    if (!!product) {
      return product.attributes;
    }
    return {};
  }

  getCatalogItemProductImage(catalogItem: ResellerCatalogItem): string {
    if (catalogItem.product.media.length > 0) {
      return catalogItem.product.media[0].image;
    }
    return '';
  }

  fetchOnboarding() {
    this.onboardingService.fetchOnboarding().subscribe(result => {
      if (result.body && result.body.length > 0) {

        const type = result.body[0].type;
        const etag = JSON.parse(result.headers.get('etag'));

        const isShowOnboarding = this.checkEtag(etag);

        if (type === 'reseller') {
          if (!isShowOnboarding) {
            log.info('onboarding already shown');
          } else {
            const onboardingDialog = this.dialog.open(OnboardingDialogComponent, {
              width: '800px',
              height: 'auto',
              data: result.body[0].contents
            })

            onboardingDialog.afterClosed().subscribe(m => {
              this.cookieService.setCookie('onboarding', etag);
            })
          }
        }
      } else {
        log.info('no onboarding');
      }
    })
  }

  checkEtag(etag: string): boolean {
    const val = this.cookieService.getCookie('onboarding');
    return val !== etag;
  }
}
