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
        .filter(m => m.href === href)[0].media[0].image;
    } catch (e) {
      return 'assets/default-image.png';
    }
  }
}
