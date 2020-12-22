import { AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@app/services/products.service';
import {
  ProductCategory, ProductItems,
  ProductLists, ProductOrdering, ProductPriceRange, ProductVendor,
} from '@app/models/product-lists';
import { PaginationService } from '@app/services/pagination.service';
import { SharedConstants } from '@app/shared/shared.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService, Logger } from '@app/core';
import { ProductPagedResponse } from '@app/core/pagination/product-paged-response';
import { ProductDetail } from '@app/models/product-detail';
import { Subscription } from 'rxjs';
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";

const log = new Logger('PLP');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {

  keyword: string = null;
  queryText = '';
  products: Array<ProductDetail>;
  productPerPageLabel = 0;
  page = 1;
  totalItems: number;
  brandList: Array<ProductVendor>;
  categoryList: Array<ProductCategory>;
  priceRangeList: Array<ProductPriceRange>;
  orderingList: Array<ProductOrdering>;

  // sort & filter
  brand = '';
  category = '';
  location: string;
  ordering = 'price';
  priceLte: number;
  priceGte: number;

  // pager
  pager: any = {};
  pages: any = {};
  lastOne: number;
  last: number;

  // sidenav-overlay
  sidenav: any;
  overlayBackground: any;

  // mobile sort
  sortMobileTitle = 'Harga';
  overlaySortBackground: any;
  sortMobileUl: any;

  // display pagination?
  displayPagination = false;

  productPagedResponse: ProductPagedResponse<ProductLists>;
  private subscription: Subscription;

  config: Configuration;

  constructor(private productsService: ProductsService,
              private pagerService: PaginationService,
              private el: ElementRef,
              private route: ActivatedRoute,
              private router: Router,
              private  title: Title,
              private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let shopName = "Nusantara Platform";
    if (!!this.config) {
      shopName = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.subscription = this.route.data.subscribe((data: {
     productPagedResponse: ProductPagedResponse<ProductLists>
    }) => {
      //
      this.productPagedResponse = data.productPagedResponse;
      this.products = data.productPagedResponse.entities.data;
      this.categoryList = data.productPagedResponse.entities.meta.facet.category;
      this.brandList = data.productPagedResponse.entities.meta.facet.vendor;
      this.orderingList = data.productPagedResponse.entities.meta.ordering;
      this.priceRangeList = data.productPagedResponse.entities.meta.facet.price;
      this.productPerPageLabel = this.products.length;
      this.totalItems = this.products.length;
      this.setPage(1);
    });

    this.route.queryParams.subscribe((queryParam: any) => {
      this.queryText = queryParam.q || '';
    });

    this.title.setTitle('Search '+ ` - ${ shopName }`);
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    this.sidenav = el.querySelector('#sidenavOverlay');
    this.overlayBackground = el.querySelector('#overlayBackground');
    this.overlaySortBackground = el.querySelector('#overlaySortBackground');
    this.sortMobileUl = el.querySelector('#sortMobileUl');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchProductLists() {
    this.route.data.subscribe((data: { product: ProductLists[] }) => {
      // this.products = data.product;
    });
  }

  setPage(page: number) {
    // get pager object from service

    this.pager = this.pagerService.getPager(this.totalItems, page, 10);
    this.pages = this.pager.pages;
    this.lastOne = this.pager.totalPages - 1;
    this.last = this.pager.totalPages;
    this.page = page;
  }

  onSorted($event: string) {
    this.ordering = $event;
    // this.productsService.sortProduct($event).subscribe(res => {
    //   this.products = res.body;
    //   this.totalItems = Number(res.headers.get('x-total-results') ? res.headers.get('x-total-results') : '100');
    // });
  }

  onFiltered($event: any) {
    const param = $event;
    switch (param.filterId) {
      case SharedConstants.FILTER_CATEGORY:
        this.category = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_BRAND:
        this.brand = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_LOCATION:
        this.location = param.$event.target.innerText;
        break;
      case SharedConstants.FILTER_PRICE:
        switch (param.$event.target.id) {
          case SharedConstants.UNDER_ONEHUNDRED:
            this.priceLte = 100000;
            this.priceGte = null;
            break;
          case SharedConstants.ONEHUNDRED_AND_TWOHUNDRED:
            this.priceLte = 200000;
            this.priceGte = 100000;
            break;
          case SharedConstants.TWOHUNDRED_AND_THREEHUNDRED:
            this.priceLte = 300000;
            this.priceGte = 201000;
            break;
          case SharedConstants.THREEHUNDRED_AND_FOURHUNDRED:
            this.priceLte = 400000;
            this.priceGte = 301000;
            break;
          case SharedConstants.ABOVE_FOURHUNDRED:
            this.priceLte = null;
            this.priceGte = 401000;
            break;
        }
        break;
    }
    this.fetchProductLists();
  }


  expandMobileSort($event: any) {
    const arrow = $event.target.lastElementChild;
    const ul = $event.target.nextElementSibling;
    arrow.classList.toggle('arrow-up');
    if (ul.style.height) {
      this.overlaySortBackground.style.display = 'none';
      ul.style.height = null;
    } else {
      this.overlaySortBackground.style.display = 'block';
      ul.style.height = ul.scrollHeight + 'px';
    }
  }

  sortMobileSelected($event: any) {
    let params = {ordering: $event.target.id};
    this.ordering = $event.target.id;
    const arrow = this.sortMobileUl.previousElementSibling.lastElementChild;
    arrow.classList.toggle('arrow-up');
    this.sortMobileTitle = $event.target.innerText;
    this.sortMobileUl.style.height = null;
    this.overlaySortBackground.style.display = 'none';
    const urlTree = this.router.parseUrl(this.router.url);
    if (!!urlTree.queryParams['ordering'] && urlTree.queryParams['ordering'] === $event.target.id) {
      params = { ordering: null };
      this.ordering = null;
      this.sortMobileTitle = 'Harga';
    }
    this.router.navigate(['.'], {queryParams: params, relativeTo: this.route, queryParamsHandling: "merge"});


    this.fetchProductLists();
  }

  search($event: any) {
    this.keyword = $event.target.value;
    this.setPage(1);
  }
}
