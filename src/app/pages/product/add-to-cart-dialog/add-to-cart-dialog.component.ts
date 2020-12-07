import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductDetail} from "@app/models/product-detail";

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss']
})
export class AddToCartDialogComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
