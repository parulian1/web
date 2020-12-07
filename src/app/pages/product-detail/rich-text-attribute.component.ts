import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ProductAttributes } from '@app/models/product-detail';


@Component({
  selector: 'app-rich-text-attribute',
  template: `
    <h3>{{ attributeMeta.name }}</h3>
    <div [innerHTML]="displayedValue"></div>
  `,
  styles: [`
    h3 {
      font-family: Noto Serif;
      font-style: normal;
      font-weight: normal;
      font-size: 28px;
      line-height: 37px;
      color: #000000;
    }
    div {
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      font-feature-settings: 'liga' off;
      color: #5A5A5A;
    }
  `]
})
export class RichTextAttributeComponent implements OnInit {

  @Input() attributeMeta: ProductAttributes;
  @Input() attributeValue: string;

  displayedValue: SafeHtml;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.displayedValue = this.sanitizer.bypassSecurityTrustHtml(this.attributeValue);
  }

}
