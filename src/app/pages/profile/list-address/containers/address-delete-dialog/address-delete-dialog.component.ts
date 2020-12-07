import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Addresses } from "@app/models/addresses";

@Component({
  selector: "app-address-delete-dialog",
  templateUrl: "./address-delete-dialog.component.html",
  styleUrls: ["./address-delete-dialog.component.scss"],
})
export class AddressDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddressDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: Addresses }
  ) {}

  ngOnInit(): void {}

  closeDialog(deleted: boolean = false) {
    this.dialogRef.close(deleted);
  }

  deleteAddress() {
    this.closeDialog(true);
  }
}
