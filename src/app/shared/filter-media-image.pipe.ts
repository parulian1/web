import {Pipe, PipeTransform} from '@angular/core';
import {ProductDetailMedia} from '@app/models/product-detail';
import {ProductCart} from "@app/models/cart";

@Pipe({
  name: 'filterMediaImage',
})
export class FilterMediaImagePipe implements PipeTransform {
  public transform(value: ProductCart[], href: string): any {
    try {
      return value
        .find(m => m.href === href ).media[0].image;
    } catch (e) {
      return 'assets/default-image.png';
    }
  }
}
