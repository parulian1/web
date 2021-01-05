import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentMode: string;

  config: Configuration;

  constructor(private title: Title, private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    this.currentMode = 'Sambungkan';
    let title = "Nusantara Platform";
    if (!!this.config?.name) {
      title = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.title.setTitle('Profile ' + ` - ${ title }`);

  }

}
