import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-nus-link',
  template: `
    <a class="link {{lastChildren}}" *ngIf="isInternal" [routerLink]="theLink()"
       [queryParams]="theParam()">{{title}}</a>
    <a class="link {{lastChildren}}" *ngIf="!isInternal" [routerLink]="href" target="_blank">{{title}}</a>
  `,
  styleUrls: ['./nus-link.component.scss']
})
export class NusLinkComponent implements OnInit, OnChanges {

  @Input() href: string;
  @Input() title: string;
  @Input() grandChild: boolean;

  isValid = false;
  isInternal = false;
  parsedUrl: any;
  lastChildren = '';

  private INTERNAL_LINK = [
    'iam', 'cms', 'catalog', 'order', 'fulfillment'
  ];

  constructor() {
  }

  ngOnInit(): void {
    if (this.grandChild === true) {
      this.lastChildren = 'last-child';
    }
  }

  theLink() {
    switch (this.parsedUrl[2]) {
      case 'category':
        return ['/products'];
      case 'product':
        return ['/products', this.parsedUrl[3]];
      case 'page':
        return ['/page', this.parsedUrl[3]];
      case 'vendor':
        return ['/brand', this.parsedUrl[3]];
      default:
        return ['#'];
    }
  }

  theParam() {
    switch (this.parsedUrl[2]) {
      case 'category':
        return {'category': this.parsedUrl[3]};
      default:
        return {};
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.href) {
      this.parsedUrl = /^.+\/api\/(.+?)\/(.+?)\/(.+?)\/$/.exec(this.href);
      this.isValid = (!!this.parsedUrl && (this.parsedUrl.length === 4));
      if (this.isValid) {
        this.isInternal = this.INTERNAL_LINK.indexOf(this.parsedUrl[1]) >= 0;
      }
    }
  }

}
