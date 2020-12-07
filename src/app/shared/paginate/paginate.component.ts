import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnInit} from '@angular/core';
import {ProductPagedResponse} from '@app/core/pagination/product-paged-response';
import {ProductLists} from '@app/models/product-lists';
import {ActivatedRoute, Router} from '@angular/router';
import {Logger} from '@app/core';
import {LinkHeaderField} from "@app/core/pagination";

const log = new Logger('Paginate');

@Component({
  selector: 'app-paginate',
  template: `
    <div class="pagination">
      <div class="left" *ngIf="!hideDescription">
        <span *ngIf="totalItems !== 0">Menampilkan {{startingIndex}}-{{endingIndex}} dari {{totalItems}} Produk</span>
      </div>
      <div class="right" *ngIf="totalItems !== 0">
        <button (click)="changePage(this.currentPage - 1)" ><i class="material-icons">arrow_back_ios</i></button>
        <span class="first" (click)="changePage(firstPage)" *ngIf="firstPage !== prevPage">{{firstPage}}</span>
        <span class="separator-dots" *ngIf="(prevPage - firstPage !== 1 && prevPage !== firstPage)">. . .</span>
        <span class="prev" (click)="changePage(prevPage)" *ngIf="prevPage">{{prevPage}}</span>
        <span class="current active" (click)="changePage(this.currentPage)">{{this.currentPage}}</span>
        <span class="next" (click)="changePage(nextPage)" *ngIf="nextPage !== lastPage">{{nextPage}}</span>
        <span class="separator-dots" *ngIf="(lastPage - nextPage !== 1 && lastPage !== nextPage)">. . .</span>
        <span class="last" (click)="changePage(lastPage)" *ngIf="lastPage">{{lastPage}}</span>
        <button (click)="changePage(this.currentPage + 1)"><i class="material-icons">arrow_forward_ios</i></button>
      </div>
    </div>
  `,
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  @Input() page: ProductPagedResponse<ProductLists>;
  @Input() hideDescription?: boolean;

  nextLabel: number;

  public linkHeadersNew: LinkHeaderField[];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  get currentPage(): number {
    return this.page?.pageNumber || 1;
  }

  get lastPage() {
    if (this.currentPage !== this.page?.maximumPageCount) {
      return this.page?.maximumPageCount;
    }
  }

  get nextPage() {
    if(this.currentPage !== this.page?.maximumPageCount) {
      return this.currentPage + 1;
    }
  }

  get firstPage(){
    if (this.currentPage -1 !== 0) {
      return this.page?.firstLength;
    }
  }

  get prevPage(){
    if (this.currentPage !== 1) {
      return this.currentPage - 1;
    }
  }

  get totalItems(): number {
    return this.page?.totalResults;
  }

  get pagesLabel(): Array<number> {
    const labels = [];

    for (let i = 0; i < this.page.maximumPageCount; i++) {
      labels.push(i + 1);
    }

    return labels;
  }

  get startingIndex(): number {
    if (!!this.page) {
      return ((this.page.pageNumber - 1) * this.page.pageSize) + 1;
    }

    return 0;
  }

  get endingIndex(): number {
    if (!!this.page) {
      return this.startingIndex + this.page.entities.data.length - 1;
    }
    return 0;
  }

  get canGoBack(): boolean {
    if (!!this.page) {
      return !!this.page.linkHeaders?.filter(lh => lh.rel === 'prev' || lh.rel === 'previous').length;
    }
    return false;
  }

  get canGoNext(): boolean {
    if (!!this.page) {
      return !!this.page.linkHeaders?.filter(lh => lh.rel === 'next').length;
    }
    return false;
  }

  goBack(): void {
    if (this.canGoBack) {
      this.changePage(this.currentPage - 1);
    }
  }

  goNext(): void {
    if (this.canGoNext) {
      this.changePage(this.currentPage + 1);
    }
  }

  changePage(value: number) {
    if (value !== this.currentPage && value !== 0 && value <= this.page?.maximumPageCount) {
      this.router.navigate(
        ['.'],
        {
          queryParams: {page: value},
          queryParamsHandling: 'merge',
          relativeTo: this.route,
        });
    }
  }


}
