import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@app/services/local-storage.service";
import {AuthenticationService} from "@app/services/auth/authentication.service";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  token: string;


  constructor(private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.auth.credentials.payload.token){
      this.token = this.auth.credentials.payload.token;
    }
  }

}
