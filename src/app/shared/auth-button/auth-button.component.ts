import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {CredentialsService} from "@app/core/authentication/credentials.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SideMenuHeaderComponent} from "@app/shell/header/side-menu-header";
import {ProfileService} from "@app/services";
import {Customer} from "@app/models/customer";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit, DoCheck {
  token: string;
  displayName = 'Teman';

  @Input()
  dialog: MatDialogRef<SideMenuHeaderComponent>;

  constructor(private creds: CredentialsService,
              private service: ProfileService) {
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
}
