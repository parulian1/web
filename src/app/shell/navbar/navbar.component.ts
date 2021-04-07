import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation } from '@app/models/navigation';
import { NavigationService } from '@app/services/navigation.service';
import { BrandService } from '@app/services';
import { Brand } from '@app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  readonly NAVIGATION_TYPE = 'navbar';

  nav: Navigation[];
  listChildren: Navigation[];
  brands: Brand[];

  hasChildren: boolean;
  isActive: boolean;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private brandService: BrandService
  ) {
  }

  ngOnInit(): void {
    this.getNavigation();
    this.getHomeBrand();
  }

  getNavigation() {
    this.navigationService.getNavigationByType(this.NAVIGATION_TYPE).subscribe(response => {
      this.nav = response.body;
    }, error => {
      this.nav = []
    });
  }

  getHomeBrand() {
    this.brandService.getHomeBrand(true).subscribe(response => {
      this.brands = response.body;
    }, error => this.brands = []);
  }

  getUrl(href: string) {
    if (!href) {
      return '#';
    }
    const r = /^.+\/api\/(.+?)\/(.+?)\/(.+?)\/$/.exec(href);
    if (!r || r.length !== 4) {
      return;
    }
    switch (r[2]) {
      case 'category':
        return '/products/?category=' + r[3];
      default:
        return '/' + r[2] + '/' + r[3];
    }
  }

  navigateTo(href: string) {
    if (!href) {
      return;
    }
    const r = /^.+\/api\/(.+?)\/(.+?)\/(.+?)\/$/.exec(href);
    if (!r || r.length !== 4) {
      return;
    }
    switch (r[2]) {
      case 'category':
        this.router.navigate(['/products'], {queryParams: {category: r[3]}});
        break;
      case 'page':
        this.router.navigate(['/page', r[3]]);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  showChildren(item_child: Navigation) {
    if (item_child.children.length !== 0) {
      this.hasChildren = true;
      this.listChildren = item_child.children;
    } else {
      this.hasChildren = false;
    }
  }
}
