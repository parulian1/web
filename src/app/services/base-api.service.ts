import { Injectable } from '@angular/core';
import {BaseService} from "@app/services/base.service";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseApiService extends BaseService {

  protected async postJson<T>(path: string, body: any): Promise<T> {
    return await super.postJson<T>(`${environment.BASE_API_URL}${path}`, body);
  }
}
