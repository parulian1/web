import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IOnboardingContent } from '@app/models';

@Component({
  selector: 'app-onboarding-dialog',
  templateUrl: './onboarding-dialog.component.html',
  styleUrls: ['./onboarding-dialog.component.scss']
})
export class OnboardingDialogComponent implements OnInit {

  pageSize = 0;
  currentIndex = 0;
  mainButtonText = '';
  statusButtonText = '';
  statusButtonHref = '';
  isStatusButton = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<IOnboardingContent>,
    public dialogRef: MatDialogRef<OnboardingDialogComponent>) {
  }

  ngOnInit(): void {
    this.initializeOnboarding();
  }

  getOnboardingSize() {
    this.pageSize = this.data.length;
  }

  initializeOnboarding() {
    this.getOnboardingSize();
    this.setStatusButton(this.currentIndex);
    this.setButtonText();
  }

  setButtonText() {
    if (this.currentIndex === 0 && this.pageSize !== 1) {
      this.mainButtonText = 'Mulai';
    } else if (this.currentIndex > 0 && this.currentIndex < (this.pageSize - 1)) {
      this.mainButtonText = 'Lanjut';
    } else {
      this.mainButtonText = 'Mulai Berjualan';
    }
  }

  goNext() {
    this.currentIndex += 1;
    this.setStatusButton(this.currentIndex);
    this.setButtonText();
  }

  goTo(idx: number) {
    this.currentIndex = idx;
    this.setStatusButton(this.currentIndex);
    this.setButtonText();
  }

  setStatusButton(currentIndex: number) {
    this.isStatusButton = false;
    this.statusButtonText = '';
    this.statusButtonHref = '';

    const currentData = this.data[currentIndex];

    if (currentIndex === this.pageSize) {
      this.dialogRef.close();
    } else {
      if (currentData.buttonStatus) {
        this.isStatusButton = true;
        this.statusButtonText = currentData.buttonText;
        this.statusButtonHref = currentData.buttonUrl;
      }
    }
  }
}
