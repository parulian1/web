import { Pipe, PipeTransform } from '@angular/core';
import { getParamValueFilter } from "@app/shared/helpers";


@Pipe({
  name: 'getParamValue',
})
export class GetParamValuePipe implements PipeTransform {
  public transform(value: string, field: string): string {
    try {
      return getParamValueFilter(value, field) || '';
    } catch (ex) {
      return '';
    }
  }
}
