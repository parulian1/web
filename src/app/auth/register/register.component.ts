import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formType: string;

  constructor(private title: Title) {
  }


  ngOnInit(): void {
    this.formType = 'Register';
    this.title.setTitle('Register ' + ' - Martha Tilaar Shop')

  }

}
