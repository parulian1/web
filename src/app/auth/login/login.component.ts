import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SideMenuHeaderComponent} from "@app/shell/header/side-menu-header";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formType: string;

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.formType = 'Login';
    this.title.setTitle('Login ' + ' - Martha Tilaar Shop')
  }

}
