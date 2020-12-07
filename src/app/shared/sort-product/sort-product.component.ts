import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ProductOrdering} from "@app/models/product-lists";
// import {ProductOrdering} from "@app/models/product-lists";

@Component({
  selector: 'app-sort-product',
  templateUrl: './sort-product.component.html',
  styleUrls: ['./sort-product.component.scss']
})
export class SortProductComponent implements OnInit {
  @Output() sorted = new EventEmitter<any>();
  @Input()
  orderingList: Array<ProductOrdering>;
  sort_title = 'Harga';
  sort_parent: any;
  arrow: any;
  collapse: any;

  currentSort: string;

  constructor(private el: ElementRef,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    //
    this.sort_parent = this.el.nativeElement.querySelector('#sort');
    this.arrow = this.el.nativeElement.querySelector('.arrow');
    this.collapse = this.el.nativeElement.querySelector('.body-collapse');
  }

  expand($event: any) {
    this.sort_parent.classList.toggle('active');
    this.arrow.classList.toggle('arrow-up');
    if (this.collapse.style.maxHeight) {
      this.collapse.style.maxHeight = null;
    } else {
      this.collapse.style.maxHeight = this.collapse.scrollHeight + 'px';
    }
  }

  sortSelected($event: any) {
    let params = {ordering: $event.target.id};
    this.sort_title = $event.target.innerText;
    this.sort_parent.classList.toggle('active');
    this.arrow.classList.toggle('arrow-up');
    if (this.collapse.style.maxHeight) {
      this.collapse.style.maxHeight = null;
    } else {
      this.collapse.style.maxHeight = this.collapse.scrollHeight + 'px';
    }
    const urlTree = this.router.parseUrl(this.router.url);
    if (!!urlTree.queryParams['ordering'] && urlTree.queryParams['ordering'] === $event.target.id) {
      params = { ordering: null };
      this.sort_title = 'Harga';
    }
    this.router.navigate(['.'], {queryParams: params, relativeTo: this.route, queryParamsHandling: "merge"});
    // this.sorted.emit($event.target.id);

  }
}
