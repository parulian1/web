import { Component, Input, OnInit } from '@angular/core';
import { Navigation } from '@app/models/navigation';
import { Brand } from '@app/models';

@Component({
  selector: 'app-menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.scss']
})
export class MenuNavbarComponent implements OnInit {
  @Input() navigation: Navigation;
  @Input() brands: Brand[];

  listChildren: Navigation[];
  hasChildren: boolean;

  constructor() {
  }

  ngOnInit(): void {

  }

  showChildren(firstChild: Navigation) {
    if (firstChild.children.length !== 0) {
      this.hasChildren = true;
      this.listChildren = firstChild.children;
    } else {
      this.hasChildren = false;
    }
  }

  resetChildren() {
    this.hasChildren = false;
    this.listChildren = [];
  }
}
