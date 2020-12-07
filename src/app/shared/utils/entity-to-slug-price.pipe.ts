import { Pipe, PipeTransform } from '@angular/core';
import { getSlugFromHrefPrice } from '@app/shared/helpers';


@Pipe({
  name: 'entityToSlugPrice',
})
export class EntityToSlugPricePipe implements PipeTransform {
  public transform(value: string): string {
    try {
      return getSlugFromHrefPrice(value) || '';
    } catch (ex) {
      return '';
    }
  }
}
