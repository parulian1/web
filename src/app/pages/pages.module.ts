import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { ShellModule } from '@app/shell/shell.module';
import { StateCheckout } from '@app/services';
import { PagesRoutingModule } from './pages-routing.module';
import {
  ProductDetailComponent, ResellerCatalogButtonComponent,
  RichTextAttributeComponent,
  VariantAttributesComponent,
  WarehouseDialogComponent
} from './product-detail';
import { StoreProvinceSelectorComponent, ChangeStoreComponent } from './store';
import { RatingReviewComponent } from '@app/pages/product-detail/rating-review';
import { RatingReviewStarsComponent } from '@app/pages/product-detail/rating-review/rating-review-stars';
import { RatingReviewBarComponent } from '@app/pages/product-detail/rating-review/rating-review-bar';
import { RatingReviewPercentageComponent } from '@app/pages/product-detail/rating-review/rating-review-percentage';
import { RatingReviewCommentsComponent } from '@app/pages/product-detail/rating-review/rating-review-comments';
import { EntityToSlugPipe } from "@app/shared/utils";
import { ProvinceDialogComponent } from './store/province-dialog/province-dialog.component';
import { VideoDialogComponent } from './product-detail/video-dialog/video-dialog.component';

@NgModule({
  declarations: [
    ChangeStoreComponent,
    StoreProvinceSelectorComponent,
    ProductDetailComponent,
    WarehouseDialogComponent,
    VariantAttributesComponent,
    RichTextAttributeComponent,
    RatingReviewComponent,
    RatingReviewStarsComponent,
    RatingReviewBarComponent,
    RatingReviewPercentageComponent,
    RatingReviewCommentsComponent,
    ProvinceDialogComponent,
    VideoDialogComponent,
    ResellerCatalogButtonComponent,
  ],
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        ShellModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        SlickCarouselModule,
        FormsModule,
        NgxYoutubePlayerModule.forRoot(),
    ],
  providers: [EntityToSlugPipe, StateCheckout]
})
export class PagesModule {
}
