import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  config: Configuration;

  constructor(private title: Title, private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let shopName = "Nusantara Platform";
    if (!!this.config) {
      shopName = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.title.setTitle('Forgot Password ' + ` - ${ shopName }`);
  }

}
