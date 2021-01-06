import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ResellerSavedCatalogService } from '@app/services';
import { ResellerSavedCatalog } from "@app/models/reseller/reseller-saved-catalog";
import { PagedResponse } from "@app/core/pagination";
import { map } from "rxjs/operators";
import { CredentialsService } from "@app/core/authentication";

@Injectable({
  providedIn: 'root'
})
export class SavedCatalogListResolver implements Resolve<PagedResponse<ResellerSavedCatalog>> {

  constructor(protected service: ResellerSavedCatalogService, private credentialsService: CredentialsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResponse<ResellerSavedCatalog>> {
    if (!this.credentialsService.getIsReseller()) {
      this.router.navigate(['/']);
    }
    return this.service.fetchList().pipe( map(resp => resp) );
  }
}
