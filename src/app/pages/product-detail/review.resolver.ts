import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReviewService} from '@app/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewResolver implements Resolve<any> {

  constructor(private service: ReviewService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');
    return this.service.fetchReviewProduct(slug).pipe(
      map(result => result.body)
    );
  }
}
