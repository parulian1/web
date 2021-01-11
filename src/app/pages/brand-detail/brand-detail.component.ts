import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from "@app/services/brand.service";
import { ActivatedRoute } from "@angular/router";
import { HighlightService } from "@app/services/highlight.service";
import { Meta, Title } from "@angular/platform-browser";
import { Brand, Configuration, HighlightList } from "@app/models";
import { ConfigService } from "@app/core";

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
  config: Configuration;

  constructor(private brandService: BrandService,
              private route: ActivatedRoute,
              private highlightService: HighlightService,
              private title: Title,
              private appConfigService: ConfigService,
              private meta: Meta) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    this.route.data.subscribe((data: { brand: Brand }) => {
      this.brand = data.brand;

    });
    this.subscribe = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.fetchHighlight();
    });
    this.setSeoTitle();
    this.setSeoMeta();
  }

  fetchHighlight() {
    this.highlightService.fetchHighlightByVendor(this.slug, true).subscribe(res => {
      this.highlight = res.body;
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  setSeoTitle() {
    let title = "Nusantara Platform";
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.title.setTitle('Brand ' + this.brand.name + ` - ${ title }`);
  }

  setSeoMeta() {
    let seoContentKeyword = '';
    if (!!this.brand?.extra?.seoKeywords) {
      seoContentKeyword = this.brand.extra.seoKeywords;
    }
    if (!!this.config?.extraConfig?.keywords) {
      seoContentKeyword += ` ${this.config.extraConfig.keywords}`;
    }
    let seoContentDescription = '';
    if (!!this.brand?.extra?.seoDescription) {
      seoContentDescription += this.brand.extra.seoDescription;
    }
    if (!!this.config?.extraConfig?.description) {
      seoContentDescription += ` ${this.config.extraConfig.description}`;
    }
    this.meta.addTag({
      name: 'description',
      content: seoContentDescription
    });
    this.meta.addTag({
      name: 'keywords',
      content: seoContentKeyword
    });
  }
}
