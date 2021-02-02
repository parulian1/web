import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { ResellerCatalogItem } from '@app/models';
import { ResellerSavedCatalogService } from '@app/services';
import { ResellerSavedCatalog, ResellerSavedCatalogItem, ResellerCatalogItemWarehouse } from '@app/models/reseller';
import { ShippingMethodService } from '@app/services/shipping-method.service';
import { ShippingCost } from '@app/models/shipping-method';
import { getSlugFromHref } from '@app/shared/helpers';
import { CartWeight } from '@app/models/cart';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutAddressFormDialogComponent } from '@app/pages/checkout/checkout-address';
import { Logger } from '@app/core';
import { CartService } from '@app/services';
import {EntityToSlugPipe} from '@app/shared/utils';

const log = new Logger('SavedCatalog');

@Component({
  selector: 'app-saved-catalog-list',
  templateUrl: './saved-catalog.html',
  styleUrls: ['./saved-catalog.scss'],
})
export class SavedCatalogComponent implements OnInit {

  entity: ResellerSavedCatalog;
  isSelectAll: boolean = false;
  selectedCatalogItems: ResellerSavedCatalogItem[] = [];
  shippingMethod: Array<{ shippingCost: ShippingCost[], warehouse: string }> = [];
  shippingSelect: Array<{ method?: ShippingCost, warehouse: string, fullWarehouse?: string, status?: boolean }> = [];
  warehouseCatalogItems: Array<CartWeight> = [];

  isQuantityFilled: boolean;
  statusArr = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private resellerSavedCatalogService: ResellerSavedCatalogService,
              private shipmentService: ShippingMethodService,
              private cartService: CartService,
              public dialog: MatDialog,
              private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.entity = data.entity;
      this.initialSetWarehouseCatalogItems();
    });
  }

  initialSetWarehouseCatalogItems() {
    let warehouses: ResellerCatalogItemWarehouse[] = [];
    this.entity.items.forEach((catalogItem) => {
      let foundWh = warehouses.filter((wh) => {
        return wh.href === catalogItem.warehouse.href;
      });
      if (foundWh.length === 0) {
        warehouses.push(catalogItem.warehouse);
      }
    });
    warehouses.forEach((warehouse) => {
      this.warehouseCatalogItems.push({
        href: warehouse.href,
        name: warehouse.name,
        postalCode: warehouse.postalCode,
        totalWeight: 0
      });
      const slug = getSlugFromHref(warehouse.href);

      let foundMatchedSavedShipmentForWarehouse = [];
      if (!!this.entity.data?.savedShipmentMethods) {
        foundMatchedSavedShipmentForWarehouse = this.entity.data?.savedShipmentMethods.filter(
          (savedShipment) => { return savedShipment.fullWarehouse === warehouse.href; }
        );
      }

      this.getShipmentMethod();

      if (foundMatchedSavedShipmentForWarehouse.length > 0) {
        this.shippingSelect.push(foundMatchedSavedShipmentForWarehouse[0]);
      } else {
        this.shippingSelect.push({warehouse: slug, fullWarehouse: warehouse.href, method: null, status: false});
      }
    });
  }

  getShipmentMethod() {
    this.shippingMethod = [];
    if (!!this.entity.data?.savedAddress?.zipCode && this.selectedCatalogItems.length > 0) {
      this.updateWarehouseCatalogItemTotalWeight();
      let warehouseFromSelected: Array<string> = [];
      this.selectedCatalogItems.forEach((item) => {
        if (warehouseFromSelected.indexOf(item.warehouse.href) === -1) {
          warehouseFromSelected.push(item.warehouse.href);
        }
      });
      warehouseFromSelected.forEach((warehouseHref) => {
        let foundWarehouse = this.warehouseCatalogItems.find((whCatalogItems) => {
          return whCatalogItems.href === warehouseHref;
        });
        if (!!foundWarehouse) {
          this.shipmentService.getShippingCost(
            foundWarehouse.totalWeight,
            foundWarehouse.postalCode,
            this.entity.data?.savedAddress?.zipCode
          ).subscribe((resp) => {
            let foundShipmentMethod = this.shippingMethod.find((shipmentMethod) => {
              return shipmentMethod.warehouse === getSlugFromHref(foundWarehouse.href);
            });
            if (!!foundShipmentMethod) {
              this.shippingMethod.map((shipmentMethod) => {
                if (shipmentMethod.warehouse === getSlugFromHref(foundWarehouse.href)) {
                  shipmentMethod.shippingCost = resp.body;
                }
              });
            } else {
              this.shippingMethod.push({
                shippingCost: resp.body,
                warehouse: getSlugFromHref(foundWarehouse.href)
              });
            }
          }, error => {
            log.error(error);
          });
        }
      });
    }
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    this.selectProductAndFetchShippingMethod();
  }

  getIsSelectAll() {
    this.isSelectAll = this.entity.items.length === this.selectedCatalogItems.length;
    return this.isSelectAll;
  }

  selectProductAndFetchShippingMethod(resellerCatalogItem?: ResellerCatalogItem) {
    if (!resellerCatalogItem) {
      if (!this.isSelectAll) {
        this.selectedCatalogItems = [];
        this.resetWarehouseCartItemTotalWeight();
      } else {
        this.pushAllItemIntoSelectedItems();
      }
    } else {
      this.addOrRemoveProductAtSelectedItems(resellerCatalogItem);
    }
    this.getShipmentMethod();
  }

  resetWarehouseCartItemTotalWeight() {
    this.warehouseCatalogItems.forEach((warehouse) => {
      warehouse.totalWeight = 0;
    });
  }

  pushAllItemIntoSelectedItems() {
    this.entity.items.forEach((catalogItem) => {
      if (this.selectedCatalogItems.indexOf(catalogItem) === -1) {
        this.selectedCatalogItems.push(catalogItem);
      }
    });
  }

  addOrRemoveProductAtSelectedItems(resellerCatalogItem?: ResellerCatalogItem) {
    let indexResellerCatalogItem = this.selectedCatalogItems.indexOf(resellerCatalogItem);
    if (indexResellerCatalogItem !== -1) {
      this.selectedCatalogItems.splice(indexResellerCatalogItem, 1);
      this.isSelectAll = false;
    } else {
      this.selectedCatalogItems.push(resellerCatalogItem);
    }
  }

  getFirstProduct(catalogItems: Array<ResellerSavedCatalogItem>) {
    if (catalogItems.length > 0) {
      return catalogItems[0].product;
    }
    return null;
  }

  getFirstProductImage(catalogItems: Array<ResellerSavedCatalogItem>) {
    return this.getFirstProduct(catalogItems)?.media[0].image;
  }

  getTotal() {
    let totalCost = 0;
    this.selectedCatalogItems.forEach((item) => {
      totalCost += parseFloat(item.price.toString()) * item.quantity;
    });
    this.shippingSelect.forEach((shipping) => {
      totalCost += shipping?.method?.cost ?? 0;
    });
    return totalCost;
  }

  getIsChecked(catalogItem: ResellerCatalogItem) {
    return this.selectedCatalogItems.indexOf(catalogItem) !== -1;
  }

  convertLongLatToFloat() {
    if (!!this.entity.data?.savedAddress?.latitude) {
      this.entity.data.savedAddress.latitude = parseFloat(this.entity.data?.savedAddress?.latitude.toString());
    }
    if (!!this.entity.data?.savedAddress?.longitude) {
      this.entity.data.savedAddress.longitude = parseFloat(this.entity.data?.savedAddress?.longitude.toString());
    }
  }

  showDialogAndGetShipmentMethod() {
    this.convertLongLatToFloat();
    let dialog = this.dialog.open(CheckoutAddressFormDialogComponent, {
      data: {
        address: this.entity.data?.savedAddress || {},
        isUpdated: !!this.entity.data?.savedAddress?.zipCode,
        isDefaultShipping: true
      },
      width: '540px',
      height: '640px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.isSuccess) {
        this.entity.data.savedAddress = {
          name: result.address.name,
          shipToName: result.address.shipToName,
          phoneNumber: result.address.phoneNumber,
          state: result.address.state,
          city: result.address.city,
          district: result.address.district,
          street: result.address.street,
          zipCode: result.address.zipCode,
          longitude: result.address.lng,
          latitude: result.address.lat,
          href: result.href,
        };
        this.updateSavedCatalogAndDownloadQuotation();
        this.getShipmentMethod();
      }
    });
  }

  isDisabledToCheckout(): boolean {
    if (!this.entity.data?.savedAddress?.zipCode || this.shippingSelect.length === 0 ||
          this.selectedCatalogItems.length === 0 || this.isQuantityFilled === false) {
      return true;
    }
    return false;
  }

  getShippingChosen($event: Array<{ warehouse: string; cost?: number; status?: boolean }>) {
    this.shippingSelect = $event;
  }

  updateDataSavedSelectedShipments() {
    this.entity.data.savedShipmentMethods = [];
    this.shippingSelect.forEach((shipment) => {
      this.entity.data.savedShipmentMethods.push(shipment);
    });
  }

  updateSavedCatalogAndDownloadQuotation(download?: boolean) {
    this.updateDataSavedSelectedShipments();
    let copyOfEntity: ResellerSavedCatalog = JSON.parse(JSON.stringify(this.entity));
    copyOfEntity.items.forEach((item) => {
      let foundItem = this.selectedCatalogItems.find((selectedCatalogItem) => {
        return selectedCatalogItem.product.href === item.product.href;
      });
      let foundItemIndex = this.selectedCatalogItems.indexOf(foundItem);
      if (foundItemIndex === -1 && this.selectedCatalogItems.length > 0) {
        let itemIndexRemove = copyOfEntity.items.indexOf(item);
        copyOfEntity.items.splice(itemIndexRemove, 1);
      }
    });
    this.resellerSavedCatalogService.update(copyOfEntity).subscribe((resp) => {
      let updatedEntity: ResellerSavedCatalog = resp.body;
      this.entity.pdf = updatedEntity.pdf;
      if (download) {
        window.open(this.entity.pdf).print();
      }
    }, (error) => {
      log.debug(`Failed to update Saved Catalog Address`);
    });
  }

  checkout() {
    let itemsAddedIntoCart: ResellerSavedCatalogItem[] = [];
    this.updateSavedCatalogAndDownloadQuotation();
    this.selectedCatalogItems.forEach((catalogItem) => {
      this.cartService.addToCart({
        product: catalogItem.product.href,
        warehouse: catalogItem.warehouse.href,
        quantity: catalogItem.quantity
      }).subscribe((resp) => {
        if (resp.status == 201) {
          itemsAddedIntoCart.push(catalogItem);
        }
        if (itemsAddedIntoCart.length === this.selectedCatalogItems.length) {
          this.router.navigateByUrl('/checkout');
        }
      }, (err) => {
        log.debug('failed Item', catalogItem);
      });
    });

  }

  downloadQuotation() {
    let isValid = true;
    if (this.selectedCatalogItems.length === 0) {
      isValid = false;
      alert('Silahkan memilih barang-barang untuk mengunduh Quotation');
    } else if (!this.entity.data?.savedAddress?.zipCode) {
      isValid = false;
      alert('Silahkan memasukkan alamat untuk mengunduh Quotation');
    } else if (this.shippingSelect.length === 0) {
      isValid = false;
      alert('Silahkan memilih metode pengiriman untuk mengunduh Quotation');
    } else {
      this.shippingSelect.forEach((shipment) => {
        if (!shipment.method && isValid) {
          isValid = false;
        }
      });
      if (!isValid) {
        alert('Silahkan memilih metode pengiriman untuk mengunduh Quotation');
      }
    }

    if (isValid) {
      this.updateSavedCatalogAndDownloadQuotation(true);
    }

  }

  updateWarehouseCatalogItemTotalWeight() {
    this.warehouseCatalogItems.map((whCatalogItems, index) => {
      let totalWeight: number = 0;
      this.selectedCatalogItems.filter((item) => {
        return item.warehouse.href === whCatalogItems.href;
      }).forEach((item) => {
        let productWeight = item.product.weight;
        whCatalogItems.totalWeight  += Number(productWeight) * Number(item.quantity);
      });
    });
  }

  getMethodOfShippingSelect() {
    return !!this.shippingSelect && this.shippingSelect.length > 0 ? this.shippingSelect[0].method : null;
  }

  getCatalogItemProductImage(catalogItem: ResellerCatalogItem): string {
    if (catalogItem.product.media.length > 0) {
      return catalogItem.product.media[0].image;
    }
    return '';
  }

  quantityFilled($event: boolean) {
    this.statusArr.push($event);
  }

  removeProduct(catalogItem: ResellerSavedCatalogItem) {
    const id = this.pipe.transform(catalogItem.href);
    this.resellerSavedCatalogService.removeItem(id).subscribe(result => {
      if (result.status === 204) {
        alert(`Product ${catalogItem.product.name} successfully removed`);
        const indexResellerSavedCatalogItem = this.entity.items.indexOf(catalogItem);
        this.entity.items.splice(indexResellerSavedCatalogItem, 1);
        const indexSelectedCatalogItem = this.selectedCatalogItems.indexOf(catalogItem);
        this.selectedCatalogItems.splice(indexSelectedCatalogItem, 1);
        if (this.entity.items.length === 0) {
          this.router.navigate(['/profile/saved-catalog']);
        }
      }
    }, (error) => {
      alert(`Failed to remove ${catalogItem.product.name}`);
    })
  }

}
