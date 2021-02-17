import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfigService } from '@app/core';
import { PagedResponse } from '@app/core/pagination';
import { ProductPromotion } from '@app/models/product-promotion';
import { ProductPromotionService } from '@app/services';
import { PaginationService } from '@app/services/pagination.service';

@Component({
  selector: 'app-promotion-list',
  template: `
    <div class="container" *ngIf="!!entities; else emptyPromoList">
      <div class="card" *ngFor="let entity of entities">
        <a [routerLink]="['/promo', entity.href|entityToSlug]">
          <div class="card-item">
            <img *ngIf="!!entity && !!entity.banner" [src]="entity?.banner" alt="{{entity.name}}"
                 appImgResize>
            <img *ngIf="!(entity && entity.banner)" [src]="this.defaultImageUrl" alt="{{entity.name}}">
            <div class="card-bottom">
              <span class="title">{{entity.name}}</span>
              <p class="text-caption accent-dark">Periode {{entity.validFrom|date: 'dd LLLL yyyy'}}
                - {{entity.validTo|date: 'dd LLLL yyyy | HH:mm'}}</p>
            </div>
            <div class="card-button">
              <button class="btn-detail">Lihat Promo</button>
            </div>
          </div>
        </a>
      </div>
    </div>
    <ng-template #emptyPromoList>
      <div class="container empty-template">
        <div class="empty-promo">
          <span class="empty-promo-title">Tidak ada Promo</span>
          <span class="empty-promo-desc">Promo tidak tersedia saat ini. Silahkan kembali ke beranda</span>
          <button class="empty-promo-btn" (click)="redirectHome()">Kembali ke Beranda</button>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit, OnDestroy {
  readonly defaultImageUrl = 'assets/defaults/banner-hero.png';

  public entities: Array<ProductPromotion>;
  public pageNum: number;
  private subscription: Subscription;


  constructor(private service: ProductPromotionService,
              private pagerService: PaginationService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data: {
      page: PagedResponse<ProductPromotion>
    }) => {
      this.entities = data.page.entities;
      this.pageNum = data.page.pageNumber;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  redirectHome() {
    this.router.navigate(['./']);
  }
}
