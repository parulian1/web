import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VerifyEmail } from '@app/models/auth';
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {
  message: string;
  config: Configuration;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appConfigService: ConfigService) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    this.route.data.subscribe((data: { confirm: VerifyEmail }) => {

      if (data.confirm) {
        this.message = data.confirm.message;
      }
    });
  }

}
