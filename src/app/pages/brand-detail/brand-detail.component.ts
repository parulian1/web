import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "@app/services/products.service";
import {HighlightDetail, HighlightList} from "@app/models/highlight";
import {BrandService} from "@app/services/brand.service";
import {Brand} from "@app/models/brand";
import {ActivatedRoute} from "@angular/router";
import {HighlightService} from "@app/services/highlight.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss']
})
export class BrandDetailComponent implements OnInit, OnDestroy {
  brand: Brand;
  highlight: Array<HighlightList> = [];
  slug: string;
  private subscribe: any;

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private highlightService: HighlightService,
    private title: Title) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { brand: Brand }) => {
      this.brand = data.brand;
      this.title.setTitle('Brand ' + this.brand.name + ' - Martha Tilaar Shop')
    });
    this.subscribe = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.fetchHighlight();
    })
  }

  fetchHighlight() {
    this.highlightService.fetchHighlightByVendor(this.slug, true).subscribe(res => {
      this.highlight = res.body;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }


}
