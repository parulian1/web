import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Warehouse} from "@app/models/wishlist";


@Component({
  selector: 'app-wishlist-select-warehouse',
  templateUrl: './wishlist-select-warehouse.component.html',
  styleUrls: ['./wishlist-select-warehouse.component.scss']
})
export class WishlistSelectWarehouseComponent {
  selectedWarehouseIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<WishlistSelectWarehouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse[]
  ) { }

  completeSelect(): void {
    if (this.selectedWarehouseIndex) {
      this.dialogRef.close(this.data[this.selectedWarehouseIndex]);
    } else {
      this.dialogRef.close(this.data[0]);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
