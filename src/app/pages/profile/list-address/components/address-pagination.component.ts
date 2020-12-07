import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PagedResponse } from "@app/core/pagination";

@Component({
  selector: "app-address-pagination",
  template: `
    <div class="pagination-container">
      <div class="pg-info">
        <p *ngIf="page?.totalResults > 0 && showLabels">
          Showing <strong>{{ startingIndex }}-{{ endingIndex }}</strong>
          of
          <strong>{{ page?.totalResults }}</strong>
        </p>
      </div>
      <div class="pg-button" *ngIf="page?.totalResults > 0">
        <button (click)="goBack()"><i class="material-icons">arrow_back_ios</i></button>
        <span>{{ page?.pageNumber }} / {{ getMaximumPageCount() }}</span>
        <button (click)="goNext()"><i class="material-icons">arrow_forward_ios</i></button>
      </div>
    </div>
  `,
  styles: [
    ".pagination-container { display: flex; justify-content: space-between; }",
    ".pg-info { color: #0a0a0a; text-align: left; width: 60%; }",
    ".pg-button button { border: none; background: none; height: 50px; cursor: pointer; }",
    ".pg-button { line-height: 50px; }",
    ".pg-button span { line-height: 50px; }",
    ".pg-button i { font-size: 1em; }",
  ],
})
export class AddressPaginationComponent {
  @Input() showLabels = true;
  @Input() page: PagedResponse<any>;
  @Input() pageSize: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  get currentPage(): number {
    return this.page?.pageNumber || 1;
  }

  get startingIndex(): number {
    if (!!this.page) {
      return (this.page.pageNumber - 1) * this.getPageSize() + 1;
    }
    return 0;
  }

  get endingIndex(): number {
    if (!!this.page) {
      return this.startingIndex + this.page.entities.length - 1;
    }
    return 0;
  }

  get canGoBack(): boolean {
    if (!!this.page) {
      return !!this.page.linkHeaders?.filter((lh) => lh.rel === "prev" || lh.rel === "previous").length;
    }
    return false;
  }

  get canGoNext(): boolean {
    if (!!this.page) {
      return !!this.page.linkHeaders?.filter((lh) => lh.rel === "next").length;
    }
    return false;
  }

  changePage(value: number) {
    if (value !== this.currentPage) {
      this.router.navigate(["./"], {
        queryParams: { page: value },
        queryParamsHandling: "merge",
        relativeTo: this.activatedRoute,
      });
    }
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

  getPageSize(): number {
    return this.pageSize ? this.pageSize : this.page.pageSize;
  }

  getMaximumPageCount(): number {
    return this.pageSize ? this.calculateMaximumPageCount() : this.page.maximumPageCount;
  }
  calculateMaximumPageCount(): number {
    return Math.ceil(this.page.totalResults / this.pageSize);
  }
}
