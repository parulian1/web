import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NavigationExtras, Router} from '@angular/router';

import {Logger} from '@app/core';
import {AuthenticationService, CredentialsService} from '@app/core/authentication';
import {Brand} from '@app/models/brand/brand';
import {BrandService} from '@app/services';

import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NavigationService} from "@app/services/navigation.service";
import {Navigation} from "@app/models/navigation";
import {EntityToSlugPipe} from "@app/shared/utils/entity-to-slug.pipe";

const log = new Logger('SideMenuHeader');

@Component({
  selector: 'app-side-menu-header',
  templateUrl: './side-menu-header.component.html',
  styleUrls: ['./side-menu-header.component.scss']
})
export class SideMenuHeaderComponent implements OnInit {
  static readonly NAV_TYPE = 'navbar';

  token: string;
  menuTitle: string;
  level = 1;
  mode = 'default';
  brands$: Observable<Brand[]>;
  navigation$: Observable<Navigation[]>;
  listNav$: Observable<Navigation[]>;

  constructor(public dialogRef: MatDialogRef<SideMenuHeaderComponent>,
              private route: Router,
              private router: Router,
              private creds: CredentialsService,
              private brandService: BrandService,
              private authService: AuthenticationService,
              private navService: NavigationService,
              private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    if (this.creds.isAuthenticated()) {
      this.token = this.creds.credentials.access;
    }

    this.brands$ = this.brandService.getHomeBrand(true).pipe(
      map(res => res.body)
    );

    this.navigation$ = this.navService.getNavigationByType(SideMenuHeaderComponent.NAV_TYPE).pipe(
      map(res => res.body)
    );

    this.navService.getNavigationByType(SideMenuHeaderComponent.NAV_TYPE).subscribe(m => {
      log.debug(m.body);
    });

  }

  closeSideMenu(path: string, queryParams?: string) {
    this.dialogRef.close();

    const navExtras: NavigationExtras = {
      queryParams: {'category': this.pipe.transform(queryParams)}
    };

    if (path !== '' && queryParams === '') {
      this.route.navigateByUrl(path);
    } else if (path === '') {
      this.dialogRef.close();
    } else {
      this.route.navigate([path], navExtras);

    }
  }

  getListBrands($event: Brand[]) {
    log.debug($event);
  }

  getDefaultImage(event: any) {
    event.target.src = 'assets/defaults/brand.png';
  }

  showMenu(menu: string, param?: number, prevMenu?: string) {
    if (menu !== 'brands') {
      this.menuTitle = menu;
      if (param !== 1) {
        this.listNav$ = this.navService.getNavigationByType(SideMenuHeaderComponent.NAV_TYPE).pipe(
          map(m => m.body.filter(t => t.title === prevMenu)),
          map(data => data[0].children.filter(title => title.title === menu)),
          map(res => res[0].children)
        );
      } else {
        this.listNav$ = this.navService.getNavigationByType(SideMenuHeaderComponent.NAV_TYPE).pipe(
          map(m => m.body.filter(t => t.title === menu)),
          map(data => data[0].children)
        );
      }
    }
    this.mode = menu;
  }

  backMenu() {
    this.mode = 'default';
  }

  getIsReseller(): boolean {
    return this.creds.getIsReseller();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('.');
  }
}
