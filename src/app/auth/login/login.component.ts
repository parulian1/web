import { Component, Input, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formType: string;
  config: Configuration;

  constructor(private title: Title, private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let title = "Nusantara Platform";
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.formType = 'Login';
    this.title.setTitle(`${this.formType} - ${ title }`)
  }

}
