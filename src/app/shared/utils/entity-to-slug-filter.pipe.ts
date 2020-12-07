import { Pipe, PipeTransform } from '@angular/core';
import {getSlugFromHrefFilter} from '@app/shared/helpers';


@Pipe({
  name: 'entityToSlugFilter',
})
export class EntityToSlugFilterPipe implements PipeTransform {
  public transform(value: string): string {
    try {
      return getSlugFromHrefFilter(value) || '';
    } catch (ex) {
      return '';
    }
  }
}
