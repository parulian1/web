import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ResellerCatalogService } from '@app/services';
import { ResellerCatalog } from "@app/models";
import { CredentialsService } from "@app/core/authentication";

@Injectable({
  providedIn: 'root'
})
export class DropShipListResolver implements Resolve<ResellerCatalog> {

  constructor(private service: ResellerCatalogService, private credentialsService: CredentialsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResellerCatalog> {
    if (!this.credentialsService.getIsReseller()) {
      this.router.navigate(['/']);
    }
    return this.service.fetchCatalog();
  }

}
