import {Component, OnInit} from '@angular/core';
import {NavigationService} from "@app/services/navigation.service";
import {Navigation} from "@app/models/navigation";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nav: Array<Navigation> = [];

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.getNavbar();
  }

  getNavbar() {
    this.navigationService.getNavbar().subscribe(res => {
      this.nav = res.body;
    })
  }

}
