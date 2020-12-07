import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {SharedConstants} from '@app/shared/shared.constants';
import {CategoryFilter} from '@app/models/category';
import {ProductPriceRange, ProductVendor} from "@app/models/product-lists";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
  @Input()
  categoryList: CategoryFilter[];
  @Input()
  brandList: ProductVendor[];
  @Input()
  priceRangeList: ProductPriceRange[];
  @Output() filter = new EventEmitter<any>();
  active_price_id: string;
  filter_category_title = 'Semua Kategori';
  filter_brand_title = 'Semua Brand';
  filter_location_title = 'Semua Toko';
  activeFilterCategoryId = 'allCategory';
  activeFilterBrandId = 'allBrand';
  activeFilterLocationId = 'allLocation';
  categoryParams: object = null;
  vendorParams: object = null;
  paramsCategory: any;
  filterPriceList: any = [
    {
      'id': SharedConstants.UNDER_ONEHUNDRED,
      'label': '< Rp. 100.000'
    },
    {
      'id': SharedConstants.ONEHUNDRED_AND_TWOHUNDRED,
      'label': 'Rp. 100.000 - Rp. 200.000'
    },
    {
      'id': SharedConstants.TWOHUNDRED_AND_THREEHUNDRED,
      'label': 'Rp. 201.000 - Rp. 300.000'
    },
    {
      'id': SharedConstants.THREEHUNDRED_AND_FOURHUNDRED,
      'label': 'Rp. 301.000 - Rp. 400.000'
    },
    {
      'id': SharedConstants.ABOVE_FOURHUNDRED,
      'label': '> Rp. 401.000'
    }
  ];

  private subscription: Subscription;

  constructor(private el: ElementRef,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngDoCheck(): void {
    const elParent = document.getElementsByClassName('parent-down');
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    if (elParent) {
      // @ts-ignore
      for (const item of elParent) {
        const stringParams = String(item.children[0].id);
        if (stringParams.match(`/${this.paramsCategory}/`)) {
          item.classList.remove('parent-down');
          item.classList.add('parent-up');

          const elParentHeight = item.children[1].scrollHeight;
          item.children[1].setAttribute('style', `max-height: ${elParentHeight}px`);
          item.parentElement.setAttribute('style', `max-height: ${elParentHeight}px`);
          if (String(item.classList).match('parent-up') && document.getElementById('allCategory').classList.contains('active')) {
            item.classList.remove('parent-up');
            item.classList.add('parent-down');

            item.children[1].setAttribute('style', `max-height: 0px`);
            item.parentElement.setAttribute('style', 'max-height: 0px');
          }
          break;
        } else {
          const stringParamsChildren = item.children[1].children;
          for (const item2 of stringParamsChildren) {
            if (String(item2.id).match(`${this.paramsCategory}`)) {
              item.classList.remove('parent-down');
              item.classList.add('parent-up');

              const elParentHeight = item.children[1].scrollHeight;
              item.children[1].setAttribute('style', `max-height: ${elParentHeight}px`);


              item.parentElement.setAttribute('style', 'max-height: ' + (elParentHeight+item.parentElement.scrollHeight) + 'px');

              if (document.getElementById('allCategory').classList.contains('active')) {
                item.classList.remove('parent-up');
                item.classList.add('parent-down');

                item.children[1].setAttribute('style', `max-height: 0px`);
                item.parentElement.setAttribute('style', 'max-height: 0px');
              }

              break;
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params.category) {

        this.paramsCategory = params.category;
        this.activeFilterCategoryId = params.category;
        if (document.getElementById(params.category)) {
          this.filter_category_title = document.getElementById(params.category).innerText
        }
        const elParent = document.getElementsByClassName('parent-down');
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        if (elParent) {
          // @ts-ignore
          for (const item of elParent) {
            const stringParams = String(item.children[0].id);
            if (stringParams.match(`/${this.paramsCategory}/`)) {
              item.classList.remove('parent-down');
              item.classList.add('parent-up');

              const elParentHeight = item.children[1].scrollHeight;
              item.children[1].setAttribute('style', `max-height: ${elParentHeight}px`);
              item.parentElement.setAttribute('style', `max-height: ${item.parentElement.scrollHeight}+${elParentHeight}`);
              break;
            } else {
              const stringParamsChildren = item.children[1].children;
              for (const item2 of stringParamsChildren) {
                if (String(item2.id).match(`${this.paramsCategory}`)) {
                    item.classList.remove('parent-down');
                    item.classList.add('parent-up');

                    const elParentHeight = item.children[1].scrollHeight;
                    item.children[1].setAttribute('style', `max-height: ${elParentHeight}px`);


                    item.parentElement.setAttribute('style', `max-height: ${item.parentElement.scrollHeight}+${elParentHeight}`);
                    break;
                }
              }
            }
          }
        }
      }
    });

  }

  filterSelected($event: any) {

    const targetId = $event.target.parentElement.parentElement.previousElementSibling.id;
    const filterId = targetId ? targetId : $event.target.parentElement.previousElementSibling.id;
    this.filter.emit({$event, filterId});

    let byUrl = {queryParams: {}};
    switch (filterId) {
      case SharedConstants.FILTER_CATEGORY:
        this.filter_category_title = $event.target.innerText;
        this.activeFilterCategoryId = $event.target.id;
        if (this.activeFilterCategoryId !== 'allCategory') {
          byUrl = this.router.parseUrl('/products?' + this.activeFilterCategoryId);
        }
        this.router.navigate(['.'], {queryParams: byUrl.queryParams, relativeTo: this.route});
        break;
      case SharedConstants.FILTER_BRAND:
        this.filter_brand_title = $event.target.innerText;
        this.activeFilterBrandId = $event.target.id;
        if (this.activeFilterBrandId !== 'allBrand') {
          byUrl = this.router.parseUrl('/products?' + this.activeFilterBrandId);
        }
        this.router.navigate(['.'], {queryParams: byUrl.queryParams, relativeTo: this.route});
        break;
      case SharedConstants.FILTER_LOCATION:
        this.filter_location_title = $event.target.innerText;
        this.activeFilterLocationId = $event.target.id;
        break;
    }
    const filterParent = targetId ? $event.target.parentElement.parentElement.previousElementSibling : $event.target.parentElement.previousElementSibling;
    filterParent.firstElementChild.classList.toggle('arrow-up');
    filterParent.classList.toggle('active');
    const collapse_body = filterParent.nextElementSibling;
    if (collapse_body.style.maxHeight) {
      collapse_body.style.maxHeight = null;
    } else {
      collapse_body.style.maxHeight = collapse_body.scrollHeight + 'px';
    }
  }

  filterPrice($event: any) {
    const filterId = SharedConstants.FILTER_PRICE;
    this.filter.emit({$event, filterId});
    this.active_price_id = $event.target.id;
    const byUrl = this.router.parseUrl('/products?' + this.active_price_id);
    this.router.navigate(['.'], {queryParams: byUrl.queryParams, relativeTo: this.route});

  }

  expand($event: any) {
    if (!$event.target.id) {
      $event.target.id = $event.target.parentElement.id;
    }
    let filterParent;
    switch ($event.target.id) {
      case SharedConstants.FILTER_CATEGORY:
        filterParent = this.el.nativeElement.querySelector('#filterCategory');
        break;
      case SharedConstants.FILTER_BRAND:
        filterParent = this.el.nativeElement.querySelector('#filterBrand');
        break;
      case SharedConstants.FILTER_LOCATION:
        filterParent = this.el.nativeElement.querySelector('#filterLocation');
        break;
      default:
        break;
    }
    const collapse_body = filterParent.nextElementSibling;
    filterParent.classList.toggle('active');
    filterParent.firstElementChild.classList.toggle('arrow-up');
    if (collapse_body.style.maxHeight) {
      collapse_body.style.maxHeight = null;
    } else {
      collapse_body.style.maxHeight = collapse_body.scrollHeight + 'px';
    }
  }

  subfilterExpand($event: any) {
    const parentElement = $event.target.parentElement;
    const collapse_body = $event.target.nextElementSibling;
    const rootFilter = $event.target.parentElement.parentElement;





    if (parentElement.classList.contains('parent-down')) {
      parentElement.classList.remove('parent-down');
      parentElement.classList.add('parent-up');
    } else {
      parentElement.classList.remove('parent-up');
      parentElement.classList.add('parent-down');
    }
    if (collapse_body.style.maxHeight) {
      collapse_body.style.maxHeight = null;
    } else {
      collapse_body.style.maxHeight = collapse_body.scrollHeight + 'px';
      const rootHeight = rootFilter.scrollHeight + collapse_body.scrollHeight;
      rootFilter.style.maxHeight = rootHeight + 'px';
    }
  }

  subfilterSelected($event: any) {
    const targetId = $event.target.parentElement.parentElement.parentElement.previousElementSibling.id;
    const filterId = targetId ? targetId : $event.target.parentElement.previousElementSibling.id;
    const parentSubfilterText = $event.target.parentElement.previousElementSibling.innerText;
    const elementText = $event.target.innerText;
    this.filter.emit({$event, filterId});
    let byUrl = {queryParams: {}}
    switch (filterId) {
      case SharedConstants.FILTER_CATEGORY:

        this.filter_category_title = `${parentSubfilterText} / ${elementText}`;

        this.activeFilterCategoryId = $event.target.id;

        if (this.activeFilterCategoryId !== 'allCategory') {
          byUrl = this.router.parseUrl('/products?' + this.activeFilterCategoryId);
        }
        this.router.navigate(['.'], {queryParams: byUrl.queryParams, relativeTo: this.route});
        break;
      case SharedConstants.FILTER_BRAND:
        this.filter_brand_title = `${parentSubfilterText} / ${elementText}`;
        this.activeFilterBrandId = $event.target.id;
        break;
      case SharedConstants.FILTER_LOCATION:
        this.filter_location_title = `${parentSubfilterText} / ${elementText}`;
        this.activeFilterLocationId = $event.target.id;
        break;
    }
    const filterParent = targetId ? $event.target.parentElement.parentElement.parentElement.previousElementSibling : $event.target.parentElement.previousElementSibling;
    filterParent.firstElementChild.classList.toggle('arrow-up');
    filterParent.classList.toggle('active');
    const collapse_body = filterParent.nextElementSibling;
    if (collapse_body.style.maxHeight) {
      collapse_body.style.maxHeight = null;
    } else {
      collapse_body.style.maxHeight = collapse_body.scrollHeight + 'px';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
