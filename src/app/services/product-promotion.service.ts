import {Injectable} from "@angular/core";
import {AbstractCrudService} from "@app/core/http/abstract-crud-service";
import {HttpClient} from "@angular/common/http";
import {ProductPromotion} from "@app/models/product-promotion";

@Injectable({
  providedIn: 'root'
})
export class ProductPromotionService  extends AbstractCrudService<ProductPromotion>{

  baseUrl = '/catalog/product-promotion'

  constructor(protected httpClient: HttpClient) {
    super();
  }

}
