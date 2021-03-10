import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareModule as ShareButtonsModule } from 'ngx-sharebuttons';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CurrentStoreComponent } from './current-store';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SortProductComponent } from './sort-product/sort-product.component';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SidenavOverlayComponent } from './sidenav-overlay/sidenav-overlay.component';
import { CartQuantityComponent } from './cart-quantity/cart-quantity.component';
import { TotalSummaryComponent } from './total-summary/total-summary.component';
import { EntityToSlugPipe } from '@app/shared/utils';
import { EntityToSlugFilterPipe } from '@app/shared/utils';
import { EntityToSlugPricePipe } from '@app/shared/utils';
import { GetParamValuePipe } from './get-param-value.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NusLinkComponent } from './nus-link/nus-link.component';
import { FilterMediaImagePipe } from './filter-media-image.pipe';
import { FieldErrorsComponent } from './field-errors.component';
import { SocialIconDirective } from './social-icon.directive';
import { ProductCardComponent, ProductCarouselComponent, ProductDiscountHighlightComponent } from './product';
import { PaginateComponent } from './paginate/paginate.component';
import { AlertDialogComponent } from '@app/shared/alert-dialog';
import { VoucherCardComponent } from '@app/shared/voucher-card';
import { StarRatingComponent } from '@app/shared/star-rating';
import { AddReviewComponent } from '@app/shared/add-review';
import { PasswordToggleIconDirective } from './password-toggle-icon.directive';
import { ClickOutsideSearchDirective } from './search-bar/click-outside-search.directive';
import { FocusInputMobileDirective } from './search-bar/focus-input-mobile.directive';
import { ResponsiveImgChooserDirective } from './responsive-img-chooser.directive';
import { VideoPlayerComponent } from '@app/shared/video-player';
import {
  ShareSocialButtonsComponent,
  ShareSocialButtonsDialogComponent
} from './share-social-buttons';
import { SharedShippingMethodComponent } from '@app/shared/shared-shipping-method.component';
import {ImgResizeDirective} from '@app/shared/nus-img-resize';
import { OnboardingDialogComponent } from '@app/shared/onboarding-dialog';
import { VideoSliderComponent } from '@app/shared/video-slider';
import { VideoCardComponent } from './video-card/video-card.component';
import { OrderCancelDialogComponent } from './order-cancel-dialog/order-cancel-dialog.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SlickCarouselModule,
    ShareButtonsModule,
  ],
  declarations: [
    LoaderComponent,
    SearchBarComponent,
    CurrentStoreComponent,
    AuthFormComponent,
    SocialButtonComponent,
    ForgotFormComponent,
    AuthButtonComponent,
    SideMenuComponent,
    SortProductComponent,
    FilterProductComponent,
    PaginationComponent,
    SidenavOverlayComponent,
    CartQuantityComponent,
    TotalSummaryComponent,
    EntityToSlugPipe,
    EntityToSlugFilterPipe,
    EntityToSlugPricePipe,
    FilterMediaImagePipe,
    GetParamValuePipe,
    WishlistComponent,
    NusLinkComponent,
    FieldErrorsComponent,

    SocialIconDirective,

    ProductCardComponent,
    ProductCarouselComponent,
    ProductDiscountHighlightComponent,
    PaginateComponent,
    AlertDialogComponent,
    VoucherCardComponent,
    StarRatingComponent,
    AddReviewComponent,
    PasswordToggleIconDirective,
    ClickOutsideSearchDirective,
    FocusInputMobileDirective,
    VideoPlayerComponent,
    ResponsiveImgChooserDirective,
    ImgResizeDirective,
    ShareSocialButtonsComponent,
    ShareSocialButtonsDialogComponent,
    SharedShippingMethodComponent,
    OnboardingDialogComponent,
    VideoSliderComponent,
    VideoCardComponent,
    OrderCancelDialogComponent,
  ],
    exports: [
        LoaderComponent,
        SearchBarComponent,
        CurrentStoreComponent,
        AuthFormComponent,
        SocialButtonComponent,
        ForgotFormComponent,
        AuthButtonComponent,
        SideMenuComponent,
        SortProductComponent,
        FilterProductComponent,
        PaginationComponent,
        SidenavOverlayComponent,
        CartQuantityComponent,
        TotalSummaryComponent,
        EntityToSlugPipe,
        EntityToSlugFilterPipe,
        EntityToSlugPricePipe,
        FilterMediaImagePipe,
        GetParamValuePipe,
        WishlistComponent,
        NusLinkComponent,
        FieldErrorsComponent,

        SocialIconDirective,

        ProductCardComponent,
        ProductCarouselComponent,
        ProductDiscountHighlightComponent,
        PaginateComponent,
        VoucherCardComponent,
        StarRatingComponent,
        ClickOutsideSearchDirective,
        FocusInputMobileDirective,
        VideoPlayerComponent,
        ResponsiveImgChooserDirective,
        ImgResizeDirective,
        ShareSocialButtonsComponent,
        ShareSocialButtonsDialogComponent,
        SharedShippingMethodComponent,
        VideoSliderComponent,
        OrderCancelDialogComponent,
    ],
})
export class SharedModule {
}
