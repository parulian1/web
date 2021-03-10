import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.scss']
})
export class OrderCancelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) { }

  onCancel(): void {
    this.onClose(false);
  }
  onYes(): void {
    this.onClose(true);
  }
  onClose(isCancel = false): void {
    this.dialogRef.close({ isCancel });
  }
}
