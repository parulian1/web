import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {AbstractCrudService} from "@app/core/http/abstract-crud-service";
import {Addresses} from "@app/models/addresses";


/**
 * A set of addresses that can be used to auto-fill the address information
 * on multiple.
 */
@Injectable({
  providedIn: 'root'
})
export class UserAddressBookService extends AbstractCrudService<Addresses> {
  baseUrl = '/iam/address/'
  constructor(protected httpClient: HttpClient) { super(); }
}
