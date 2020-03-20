import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@app/services/local-storage.service";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  token: string;


  constructor(private localStorage: LocalStorage) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

  }

}
