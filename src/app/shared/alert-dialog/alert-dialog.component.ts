import {Component, Inject, OnInit} from '@angular/core';
import {Logger} from "@app/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

const log = new Logger('AlertDialog');

@Component({
  selector: 'app-alert-dialog',
  template: `
    <div class="messages">
      <p class="mt-alert--title">{{messages}}</p>
      <p class="mt-alert--subtitle">{{additionalMessage}}</p>
    </div>`,
  styles: [``]
})
export class AlertDialogComponent implements OnInit {
  messages: string;
  additionalMessage: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.messages = this.data.message;
    if (this.data.additionalMessage) {
      this.additionalMessage = this.data.additionalMessage;
    }
  }

}
