import { Injectable } from '@angular/core';
import {BrandService} from "@app/services/brand.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Brand} from "@app/models/brand";
import {map} from "rxjs/operators";
import {Logger} from "@app/core";

const log = new Logger('BrandDetailResolver');

@Injectable({
  providedIn: 'root'
})

export class BrandDetailResolverService {
  constructor(private service: BrandService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand> {
    const slug = route.paramMap.get('slug');
    return this.service.getVendorBySLug(slug).pipe(
      map(resp => resp.body)
    );
  }
}
