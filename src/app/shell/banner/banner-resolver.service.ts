import {Injectable} from '@angular/core';
import {Banner} from '@app/models/banner';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BannerService} from '@app/services/banner.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerResolverService implements Resolve<Banner[]> {

  constructor(private service: BannerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Banner[]> {
    return this.service.getMainBanners().pipe(
      map(res => res.body)
    );
  }
}
