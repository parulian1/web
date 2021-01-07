import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ResellerSavedCatalogService } from '@app/services';
import { ResellerSavedCatalog } from "@app/models/reseller/reseller-saved-catalog";
import { CredentialsService } from "@app/core/authentication";

@Injectable({
  providedIn: 'root'
})
export class SavedCatalogResolver implements Resolve<ResellerSavedCatalog> {

  constructor(protected service: ResellerSavedCatalogService, private credentialsService: CredentialsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResellerSavedCatalog> {
    if (!this.credentialsService.getIsReseller()) {
      this.router.navigate(['/']);
    }
    const id = route.paramMap.get('id');
    return this.service.fetch(id);
  }
}
