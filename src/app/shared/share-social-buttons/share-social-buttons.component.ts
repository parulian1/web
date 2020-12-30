import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ShareSocialButtonsDialogComponent } from "./share-social-buttons-dialog.component";

@Component({
  selector: "app-share-social-buttons",
  template: `
    <div class="share-social-wrapper">
      <a (click)="openSocialDialog()">
        <mat-icon>share</mat-icon>
        <span *ngIf="text && !iconOnly">{{ text }}</span>
      </a>
    </div>
  `,
  styles: [
    `
      .share-social-wrapper {
        display: inline;
      }
      .share-social-wrapper > a {
        cursor: pointer;
      }

      mat-icon {
        background-color: black;
        color: white;
        border-radius: 4px;
        width: 36px;
        height: 36px;
        padding: 5px;
      }

      @media only screen and (max-width: 500px) {
        mat-icon {
          width: 24px;
          height: 24px;
          padding: 0.2em;
          font-size: 17px;
        }
      }
    `,
  ],
})
export class ShareSocialButtonsComponent {
  @Input() iconOnly = true;
  @Input() text: string;

  constructor(public dialog: MatDialog) {}

  openSocialDialog(): void {
    const dialogRef = this.dialog.open(ShareSocialButtonsDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
