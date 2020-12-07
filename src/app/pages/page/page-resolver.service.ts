import {Injectable} from '@angular/core';
import {BrandService} from "@app/services/brand.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Logger} from "@app/core";
import {Page} from "@app/models/page";
import {PageService} from "@app/services/page.service";

const log = new Logger('BrandDetailResolver');

@Injectable({
  providedIn: 'root'
})

export class PageResolverService {
  constructor(private service: PageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page> {
    const slug = route.paramMap.get('slug');
    return this.service.getPage(slug);
  }
}
