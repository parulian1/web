import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-share-social-buttons-dialog",
  template: `
    <div class="social-button-dialog-wrapper">
      <div class="social-button__header">
        <span class="title">Share to Your Social Media</span>
        <div class="close-btn">
          <a (click)="close()"> X </a>
        </div>
      </div>

      <div class="social-button__content">
        <button shareButton="facebook" class="button">
          <img src="assets/social/facebook_round.png" alt="Logo Facebook" />
          <span>Facebook</span>
        </button>

        <button shareButton="twitter" class="button">
          <img src="assets/social/twitter_round.png" alt="Logo Twitter" />
          <span>Twitter</span>
        </button>

        <button shareButton="whatsapp" class="button">
          <img src="assets/social/whatsapp_round.svg" alt="Logo Facebook" />
          <span>Whatsapp</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: [`./share-social-buttons-dialog.scss`],
})
export class ShareSocialButtonsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareSocialButtonsDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
