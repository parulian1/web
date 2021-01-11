import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Banner } from '@app/models/banner';
import { HighlightList } from '@app/models/highlight';
import { HighlightService } from '@app/services/highlight.service';
import { DatePipe } from '@angular/common';
import { TestimonialService } from '@app/services/testimonial.service';
import { Testimonial } from '@app/models/testimonial';
import { Configuration } from "@app/models";
import { Meta, Title} from "@angular/platform-browser";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-home',
  template: `
    <div class="container-home">
      <section class="banner">
        <app-banner
          class="main-banner"
          [banners]="banners">
        </app-banner>
      </section>
      <section class="app-highlight">
        <app-highlight-category class="highlight-category"></app-highlight-category>
      </section>
      <section class="app-sla">
        <app-sla class="sla"></app-sla>
      </section>

      <app-product-carousel
        *ngFor="let highlight of highlights"
        [highlight]="highlight">
      </app-product-carousel>

      <section class="brands">
        <app-brands class="brand"></app-brands>
      </section>
      <section class="promo">
        <app-promo-banner class="promo-banner" [banners]="bannersPromo"></app-promo-banner>
      </section>
      <section class="testimonial-section" *ngIf="!!testimonials && testimonials.length>0">
        <app-testimonial class="testi"></app-testimonial>
      </section>
      <section class="home__blog">
        <app-blog class="blog" [limit]="5"></app-blog>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners: Array<Banner>;
  bannersPromo: Banner[];
  highlights: Array<HighlightList> = [];

  testimonials: Testimonial[];

  config: Configuration;

  constructor(private route: ActivatedRoute,
              private highlightService: HighlightService,
              private datePipe: DatePipe,
              private testimonialService: TestimonialService,
              private appConfigService: ConfigService,
              private title: Title,
              private meta: Meta) {
  }

  ngOnInit() {
    this.config = this.appConfigService.config;
    this.route.data.subscribe((data: { banners: Array<Banner> }) => {
      if (data.banners) {
        let now = String(new Date());
        now = this.datePipe.transform(now, 'yyyy-MM-ddTHH:mm:ssZZZZZ');

        this.banners = data.banners.filter(m => m.type === 'utama' && m.isActive === true && m.displayHomepage === true && this.fromDateFilter(now, m.validFrom) && this.toDateFilter(now, m.validTo))
        this.bannersPromo = data.banners.filter(m => m.type === 'promo' && m.displayHomepage === true);
      }
    });
    this.fetchHighlight();
    this.checkTestimonials();
    this.setSeoTitle();
    this.setSeoMeta();
  }

  fetchHighlight() {
    this.highlightService.fetchHighlightHomePage(true).subscribe(res => {
      this.highlights = res.body;
    });
  }

  fromDateFilter(now: string, validFrom: string) {
    const timeNow = new Date(now).getTime();
    const timeFrom = new Date(validFrom).getTime();

    return timeNow >= timeFrom;
  }

  toDateFilter(now: string, validTo: string) {
    const timeNow = new Date(now).getTime();
    const timeTo = new Date(validTo).getTime();

    return timeNow <= timeTo;
  }

  checkTestimonials() {
    this.testimonialService.fetchTestimonial({ perPage: 4, page: 1, is_active: true }).subscribe(result => {
      this.testimonials = result.body;
    })
  }

  setSeoTitle() {
    let title = "Nusantara Platform";
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.title.setTitle(`Home - ${ title }`);
  }

  private setSeoMeta() {
    if (!!this.config?.extraConfig?.description) {
      this.meta.addTag({
        name: 'description', content: this.config.extraConfig.description
      });
    }
    if (!!this.config?.extraConfig?.keywords) {
      this.meta.addTag({
        name: 'keywords', content: this.config.extraConfig.keywords
      });
    }
  }
}
