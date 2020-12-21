import { Component, OnInit } from '@angular/core';
import { PageService } from "@app/services/page.service";
import { Page } from "@app/models/page";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  pageContent: Page;
  config: Configuration;

  constructor(private pageService: PageService,
              private route: ActivatedRoute,
              private title: Title,
              private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let shopName = "Martha Tilaar Shop";
    if (!!this.config) {
      shopName = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.route.data.subscribe((data: { page: Page }) => {
      this.pageContent = data.page;
      this.title.setTitle(this.pageContent.title + ` - ${ shopName }`) ;
    });
  }
}
