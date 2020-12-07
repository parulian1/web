import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductComponent} from '@app/pages/product/product.component';
import {ProductDetailComponent} from '@app/pages/product-detail/product-detail.component';
import {ProductListResolverService} from '@app/pages/product/product-list-resolver.service';
import {ProductDetailResolverService} from '@app/pages/product-detail/product-detail-resolver.service';
import {WarehouseDetailResolverService} from '@app/pages/product-detail/warehouse-detail-resolver.service';
import {CategoryResolverService} from '@app/pages/product/category-resolver.service';
import {ProductAttributeResolverService} from '@app/pages/product-detail/product-attribute-resolver.service';
import {RatingResolver, VariantsResolver} from '@app/pages/product-detail';
import {ReviewResolver} from '@app/pages/product-detail/review.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      category: CategoryResolverService,
      productPagedResponse: ProductListResolverService
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':slug',
    component: ProductDetailComponent,
    resolve: {
      product: ProductDetailResolverService,
      warehouse: WarehouseDetailResolverService,
      attribute: ProductAttributeResolverService,
      variants: VariantsResolver,
      review: ReviewResolver,
      // stock: StockResolver,
      rating: RatingResolver,
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
