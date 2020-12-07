import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MaterialModule } from '@app/material.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from '@app/shell/shell.component';
import { SharedModule } from '@app/shared';
import { SlaComponent } from './sla/sla.component';
import { BannerComponent } from './banner/banner.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { BrandsComponent } from './brands/brands.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuBrandComponent } from './header/menu-brand/menu-brand.component';
import { HighlightCategoryComponent } from './highlight-category/highlight-category.component';
import { BlogComponent } from './blog/blog.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { CopyrightComponent, FooterComponent } from './footer';
import { SingleBannerComponent } from './single-banner/single-banner.component';
import { ProductLineComponent } from './product-line/product-line.component';
import { StripHtmlPipe } from '@app/shell/strip-html.pipe';
import { ProductLineNoImageComponent } from './product-line-no-image/product-line-no-image.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { SideMenuHeaderComponent } from '@app/shell/header/side-menu-header';
import { EntityToSlugPipe } from "@app/shared/utils/entity-to-slug.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        MaterialModule,
        SharedModule,
        RouterModule,
        SlickCarouselModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    SlaComponent,
    BannerComponent,
    TestimonialComponent,
    BrandsComponent,
    NavbarComponent,
    MenuBrandComponent,
    HighlightCategoryComponent,
    FooterComponent,
    SocialMediaComponent,
    CopyrightComponent,
    SingleBannerComponent,
    ProductLineComponent,
    BlogComponent,
    StripHtmlPipe,
    ProductLineNoImageComponent,
    PromoBannerComponent,
    SideMenuHeaderComponent,
  ],
  exports: [
    ShellComponent,
    HeaderComponent,
    SlaComponent,
    BannerComponent,
    TestimonialComponent,
    BrandsComponent,
    HighlightCategoryComponent,
    FooterComponent,
    SocialMediaComponent,
    CopyrightComponent,
    SingleBannerComponent,
    ProductLineComponent,
    BlogComponent,
    ProductLineNoImageComponent,
    PromoBannerComponent,
    SideMenuHeaderComponent
  ],
  providers: [
    DatePipe,
    EntityToSlugPipe
  ]
})
export class ShellModule {
}
