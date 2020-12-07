import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-wishlist-search",
  template: `
    <div class="mt-header-search">
      <span class="search-input">
        <input type="search" #searchBox placeholder="Cari di wishlist" (keyup)="searching(searchBox.value)" />
        <i class="material-icons icon-search">search</i>
      </span>
    </div>
  `,
  styleUrls: ["./wishlist-search.component.scss"],
})
export class WishlistSearchComponent implements OnInit, OnDestroy {
  @Input() readonly search$: Subject<string> = new Subject<string>();
  q: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchSubjectSubscription();
  }
  ngOnDestroy(): void {
    this.search$.unsubscribe();
  }

  searching(value): void {
    this.search$.next(value);
  }
  searchSubjectSubscription() {
    this.search$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((searchValue: string) => {
      this.q = searchValue;
      this.navigateSearch();
    });
  }

  navigateSearch(): void {
    this.router.navigate(["."], {
      queryParams: {
        wishlist_query: this.q || "",
        page: 1,
      },
      relativeTo: this.route,
    });
  }
}
