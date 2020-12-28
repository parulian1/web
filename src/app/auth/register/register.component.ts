import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ConfigService } from "@app/core";
import { Configuration } from "@app/models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formType: string;
  config: Configuration;

  constructor(private title: Title, private appConfigService: ConfigService) {
  }


  ngOnInit(): void {
    this.config = this.appConfigService.config;
    this.formType = 'Register';
    let shopName = "Nusantara Platform";
    if (!!this.config?.name) {
      shopName = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.title.setTitle(`${this.formType} - ${ shopName }`)

  }

}
