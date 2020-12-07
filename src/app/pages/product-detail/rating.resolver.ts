import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReviewService} from '@app/services';
import {map} from 'rxjs/operators';
import {RatingSummary} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class RatingResolver implements Resolve<RatingSummary> {

  constructor(private service: ReviewService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');
    return this.service.fetchRatingSummary(slug).pipe(
      map(result => result.body)
    );
  }
}
