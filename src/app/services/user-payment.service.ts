import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AbstractCrudService} from "@app/core/http/abstract-crud-service";
import {UserPayment} from "@app/models/customer/payment";
import {Observable} from "rxjs";
import {EntityToSlugPipe} from "@app/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class UserPaymentService extends AbstractCrudService<UserPayment> {

  baseUrl = '/order/credit-card'

  constructor(protected httpClient: HttpClient,
              private entityToSlugPipe: EntityToSlugPipe,) {
    super();
  }

  delete(entity: UserPayment | { href: string }): Observable<any> {
    return this.httpClient.delete(this.absoluteUrl(entity.href));
  }

  absoluteUrl(url: string): string {
    return `${this.baseUrl}/${this.entityToSlugPipe.transform(url)}/`;
  }

}
