/*
 * Use the Page Object pattern to define the pages under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { element, by } from 'protractor';

export class ShellPage {
  welcomeText = element(by.css('app-root mat-card-title'));

  getParagraphText() {
    return this.welcomeText.getText();
  }
}
