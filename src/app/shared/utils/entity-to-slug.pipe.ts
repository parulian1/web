import { Pipe, PipeTransform } from '@angular/core';
import {getSlugFromHref} from '@app/shared/helpers';


@Pipe({
  name: 'entityToSlug',
})
export class EntityToSlugPipe implements PipeTransform {
  public transform(value: string): string {
    try {
      return getSlugFromHref(value) || '';
    } catch (ex) {
      return '';
    }
  }
}
