import {Component, OnInit} from '@angular/core';
import {NavigationService} from '@app/services/navigation.service';
import {Navigation} from '@app/models/navigation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nav: Array<Navigation> = [];
  public readonly navigationType: string = 'navbar';
  hasChildren: boolean;
  listChildren: Navigation[] = [];
  isActive: boolean;

  constructor(private navigationService: NavigationService, private router: Router) {
  }

  ngOnInit(): void {
    this.getNavigation();
  }

  getNavigation() {
    this.navigationService.getNavigationByType(this.navigationType).subscribe(response => {
      this.nav = response.body;
    });
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
