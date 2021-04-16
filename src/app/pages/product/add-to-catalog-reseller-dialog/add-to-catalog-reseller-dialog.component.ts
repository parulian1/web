import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductDetail } from "@app/models/product-detail";

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-catalog-reseller-dialog.component.html',
  styleUrls: ['./add-to-catalog-reseller-dialog.component.scss']
})
export class AddToCatalogResellerDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    product: string,
    quantity: number,
    warehouse: string,
    products?: ProductDetail,
    total?: number,
    price: number,
    warehouseName?: string,
    message?: string,
    status?: number
  }) {
  }
}
