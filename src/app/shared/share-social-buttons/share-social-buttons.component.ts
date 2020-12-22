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
