import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-share-social-buttons-dialog",
  template: `
    <div class="social-button-dialog-wrapper">
      <div class="social-button__header">
        <h1 class="title">Share to Your Social Media</h1>
        <div class="close-btn">
          <a (click)="close()"> X </a>
        </div>
      </div>

      <div class="social-button__content">
        <button shareButton="facebook" class="button button--facebook">
          <!-- <img [src]="socialMediaLogos['facebook']" alt="">-->
          <mat-icon aria-hidden="false">facebook</mat-icon>
          <span>Facebook</span>
        </button>

        <button shareButton="twitter" class="button button--twitter">
          <!-- <img [src]="socialMediaLogos['twitter']" alt="">-->
          <mat-icon aria-hidden="false">facebook</mat-icon>
          <span>Twitter</span>
        </button>

        <button shareButton="whatsapp" class="button button--whatsapp is-flex">
          <!-- <img [src]="socialMediaLogos['whatsapp']" alt="">-->
          <mat-icon aria-hidden="false">facebook</mat-icon>
          <span>Whatsapp</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: [`./share-social-buttons-dialog.scss`],
})
export class ShareSocialButtonsDialogComponent {
  socialMediaLogos = {
    facebook: "assets/social/logo-fb.svg",
    twitter: "assets/social/logo-twitter.svg",
    whatsapp: "assets/social/logo-twitter.svg",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShareSocialButtonsDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
