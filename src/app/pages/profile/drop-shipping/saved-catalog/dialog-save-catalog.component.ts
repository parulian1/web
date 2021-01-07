import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
  selector: 'dialog-save-catalog',
  template: `
    <button class="close" mat-button mat-dialog-title (click)="closeDialog()">X</button>
    <h1 mat-dialog-title>Save Catalog</h1>
    <div mat-dialog-content class="mat-form-row">
        <div class="left">Catalog Name</div>
        <div class="right"><input matInput [(ngModel)]="data.catalogName" class="catalog-name"></div>
    </div>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="data.catalogName" class="btn btn-primary btn-full"
              cdkFocusInitial>
        Save & Download Catalog
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .close {
      position: absolute;
      right: -31px;
      top: 23px;
      transform: translate(-50%, -50%);
    }
  `]
})
export class DialogSaveCatalogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSaveCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { catalogName: string }) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
