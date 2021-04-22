import { Component } from '@angular/core';

@Component({
  selector: 'app-error-checkout-dialog',
  template: `
    <mat-dialog-content>
      <div class="error-checkout-dialog">
        <p>
          Cart was changed. Please check again
        </p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button class="btn-primary" (click)="reloadWindow()">OK</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .error-checkout-dialog {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    button {
      width: 100%;
      cursor: pointer;
    }
  `
  ]
})
export class ErrorCheckoutDialogComponent {

  reloadWindow() {
    window.location.reload();
  }
}
