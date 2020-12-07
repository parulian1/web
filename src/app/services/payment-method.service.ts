import {Injectable} from '@angular/core';
import {BaseApiService} from '@app/core/http/base-api.service';
import {PaymentMethod} from '@app/models/payment-method';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseApiService<PaymentMethod> {

  baseUrl = '/order/payment-method/';

  constructor(protected httpClient: HttpClient) {
    super();
  }
}
