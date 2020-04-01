import {Component, OnInit} from '@angular/core';
import {CredentialsService} from "@app/core/authentication/credentials.service";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  token: string;

  constructor(private creds: CredentialsService) {
  }

  ngOnInit(): void {
    if(this.creds.isAuthenticated()){
      this.token = this.creds.credentials.token;
    }

  }

}
