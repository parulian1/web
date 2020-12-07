import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppState} from '@app/store/state/app.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '@app/core/authentication';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @ViewChild('menuModal', {static: true}) menuModal: ElementRef;
  @ViewChild('overlaySortBackground', {static: true}) overlaySortBackground: ElementRef;
  @ViewChild('tes', {static: true}) tes: ElementRef;
  showModalMenu = false;

  constructor(private store: Store<AppState>,
              private router: Router,
              public dialog: MatDialog,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  logout() {
    // this.store.dispatch(new Logout()); remove temporarily due to error when user just register
    this.authService.logout();
    this.router.navigateByUrl('.');
  }

  getActiveUrl() {
    const url = this.router.url;
    if (url.includes('addresses')) {
      return 'Daftar Alamat';
    } else if (url.includes(('orders'))) {
      return 'Daftar Transaksi';
    } else if (url.includes('wishlist')) {
      return 'Wishlist';
    } else if (url.includes('payments')) {
      return 'Pembayaran';
    } else if (url.includes('review')) {
      return 'Ulasan';
    }

    return 'Profile';
  }

  getActiveStat(param: string) {
    const url = this.router.url;
    if (url.includes(param)) {
      return true;
    } else if (url === '/profile' && param === 'default') {
      return true;
    }

    return false;
  }

  toggleMobileMenu() {
    this.showModalMenu = !this.showModalMenu;
    if (this.showModalMenu) {
      this.overlaySortBackground.nativeElement.style.display = 'block';
    } else {
      this.overlaySortBackground.nativeElement.style.display = 'none';
    }
  }
}
