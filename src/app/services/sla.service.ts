import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sla} from '@app/models/sla';
import {BaseApiService} from '@app/core/http/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SlaService extends BaseApiService<Sla> {

  baseUrl = '/cms/sla/';

  constructor(protected httpClient: HttpClient) {
    super();
  }
}
