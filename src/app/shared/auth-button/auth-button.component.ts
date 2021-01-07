import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { CredentialsService } from "@app/core/authentication/credentials.service";
import { MatDialogRef } from "@angular/material/dialog";
import { SideMenuHeaderComponent } from "@app/shell/header/side-menu-header";
import { ProfileService } from "@app/services";
import { Customer } from "@app/models/customer";
import { AuthenticationService } from "@app/core/authentication";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit, DoCheck {
  token: string;
  displayName = 'Teman';
  isShowPopup = false;

  @Input()
  dialog: MatDialogRef<SideMenuHeaderComponent>;

  constructor(private creds: CredentialsService,
              private service: ProfileService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.creds.isAuthenticated()) {
      this.token = this.creds.credentials.access;
    } else {
      this.token = '';
    }

    // this.getDisplayName();

  }

  ngDoCheck(): void {
    if (this.creds.isAuthenticated()) {
      this.token = this.creds.credentials.access;
    } else {
      this.token = '';
    }
  }

  private getDisplayName() {
    this.service.getCurrentUserProfile().subscribe((res: Customer) => {
      this.displayName = res.lastName || res.firstName;
    });
  }

  toogleMenu() {
    if(this.token) {
      this.isShowPopup = !this.isShowPopup;
      // this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  togglePopupMenu($event: MouseEvent) {
    // if(this.token){
    //   this.isShowPopup = !this.isShowPopup;
    // } else {
    //   this.router.navigateByUrl('/login');
    // }

  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('.');
  }

  goTo(s: string) {
    this.isShowPopup = !this.isShowPopup;
    this.router.navigate([s]);
  }

  clickCheck($event: any) {
    if($event === true) {
      this.isShowPopup = false;
    }
  }

  getIsReseller(): boolean {
    return this.creds.getIsReseller();
  }
}
