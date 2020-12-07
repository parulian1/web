import {HttpResponse} from '@angular/common/http';
import {LinkHeaderField} from '@app/core/pagination/link-header';
import {ProductLists} from "@app/models/product-lists";

export class ProductPagedResponse<T> {

  public linkHeaders: LinkHeaderField[];
  public totalResults = 0;
  public pageSize = 20;
  public pageNumber = 1;
  public entities: ProductLists;
  public rawLinks: LinkHeaderField[];

  public nextLength: number;
  public prevLength: number;
  public firstLength: number;
  public lastLength: number;

  public nextLabel: number;
  public prevLabel: number;
  public firstLabel: number;
  public lastLabel: number;

  constructor(private response: HttpResponse<ProductLists>,
              private page: number) {

    const links = response.headers.get('Link');

    this.totalResults = Number(response.headers.get('x-total-results'));
    this.pageNumber = page;

    if (links) {
      this.linkHeaders = links.split(',').map(s => new LinkHeaderField(s));


      this.rawLinks = this.linkHeaders.filter(m => m.rawLink);

      this.nextLength = this.linkHeaders.filter(next => next.rel === 'next').length;
      this.prevLength = this.linkHeaders.filter(prev => prev.rel === 'prev').length;
      this.firstLength = this.linkHeaders.filter(first => first.rel === 'first').length;
      this.lastLength = this.linkHeaders.filter(last => last.rel === 'last').length;
    }

    this.entities = response.body;
  }

  get maximumPageCount(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }
}
