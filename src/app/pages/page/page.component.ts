import {Component, OnInit} from '@angular/core';
import {PageService} from "@app/services/page.service";
import {Page} from "@app/models/page";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  pageContent: Page;

  constructor(private pageService: PageService, private route: ActivatedRoute, private title: Title) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { page: Page }) => {
      this.pageContent = data.page;
      this.title.setTitle(this.pageContent.title + ' - Martha Tilaar Shop')    });
  }
}
