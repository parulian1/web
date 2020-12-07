import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentMode: string;

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.currentMode = 'Sambungkan';
    this.title.setTitle('Profile ' + ' - Martha Tilaar Shop')

  }

}
