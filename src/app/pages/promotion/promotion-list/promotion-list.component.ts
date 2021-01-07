import { Component, OnInit } from '@angular/core';
import {ProductPromotionService} from '@app/services';
import {PaginationService} from '@app/services/pagination.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ConfigService} from '@app/core';
import {ProductPagedResponse} from '@app/core/pagination/product-paged-response';
import {ProductPromotion} from '@app/models/product-promotion';
import {Subscription} from 'rxjs';
import {PagedResponse} from '@app/core/pagination';

@Component({
  selector: 'app-promotion-list',
  template: `

    <div class="container">

      <div class="card" *ngFor="let entity of entities">
        <a [routerLink]="['/promo', entity.href|entityToSlug]">
          <div class="card-item">
            <img *ngIf="!!entity && !!entity.banner" [src]="entity?.banner" alt="{{entity.name}}" appImgResize>
            <img *ngIf="!(entity && entity.banner)" [src]="this.defaultImageUrl" alt="{{entity.name}}" >
            <div class="card-bottom">
              <h3>{{entity.name}}</h3>
              <p class="text-caption accent-dark">Periode {{entity.validFrom|date: 'dd LLLL yyyy'}} - {{entity.validTo|date: 'dd LLLL yyyy | HH:mm'}}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {
  readonly defaultImageUrl = 'assets/defaults/banner-hero.png';

  public entities: Array<ProductPromotion>;
  public pageNum: number;
  private subscription: Subscription;


  constructor(private service: ProductPromotionService,
              private pagerService: PaginationService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private appConfigService: ConfigService) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data: {
      page: PagedResponse<ProductPromotion>
    }) => {
      this.entities = data.page.entities;
      this.pageNum = data.page.pageNumber;
    });
  }

}
