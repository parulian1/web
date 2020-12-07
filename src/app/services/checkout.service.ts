import { Injectable } from "@angular/core";
import { BaseApiService } from "@app/core/http/base-api.service";
import { Addresses } from "@app/models/addresses";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

interface PaymentPayload {
  token: string;
  redirectUrl: string;
}

enum PaymentStatus {
  Canceled = 'cancelled',
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends BaseApiService<Addresses> {

  baseUrl = '/iam/address/';

  constructor(protected httpClient: HttpClient) {
    super();
  }

  fetchPaymentRequest2(orderNumber: string): Observable<HttpResponse<PaymentPayload>> {
    return this.httpClient.post<PaymentPayload>(
      `/order/payment-request/`,
      { orderNumber },
      {observe: "response"},
      );
  }

  cancelPayment(orderNumber: string): Observable<HttpResponse<any>> {
    // todo: need action to cancel a order, need discussion
    return this.httpClient.patch<any>(
      `/order/${orderNumber}/`, { status: PaymentStatus.Canceled }
    );
  }
}
