import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-store-side-menu',
  templateUrl: './store-side-menu.component.html',
  styleUrls: ['./store-side-menu.component.scss']
})
export class StoreSideMenuComponent implements OnInit {
  @Input()
  address: Array<string> = [];

  @Input()
  storeList: Array<{ name: string, addr: string, code: string, state: string }> = [];

  constructor() {
  }

  ngOnInit(): void {

  }



}
