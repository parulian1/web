import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthUserService } from "@app/services";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Configuration } from "@app/models";
import { ConfigService } from "@app/core";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;

  private uid: string;
  private token: string;

  config: Configuration;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authUserService: AuthUserService,
              private title: Title,
              private appConfigService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.config = this.appConfigService.config;
    let shopName = "Nusantara Platform";
    if (!!this.config) {
      shopName = this.config.name.substr(0, 1).toUpperCase() + this.config.name.substr(1);
    }
    this.initForm();
    this.initTokenAndUid();
    this.title.setTitle('Reset Passwords ' + ` - ${ shopName }`);

  }

  initTokenAndUid(): void {
    this.activatedRoute.params.subscribe(result => {
      this.token = result.token;
      this.uid = result.uid;
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      'newPassword': ['', [Validators.required, Validators.minLength(8)]],
      'confirmationPassword': ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const {newPassword, confirmationPassword} = this.form.value;
      if (newPassword === confirmationPassword) {
        this.authUserService.resetPassword({
          token: this.token,
          uid: this.uid,
          password: this.form.value.newPassword,
        }).subscribe(() => {
          this.router.navigate(['login']);
          alert('Berhasil Reset Password');
        }, error => this.handleError(error));
      } else {
        this.form.controls['newPassword'].setErrors({
          'nomatch': ['New Password and Confirmation Password didnt match']
        });
      }
    }
  }

  handleError(error: any) {
    if (error.status === 400) {
      this.setErrors(error.error);
    } else {
      this.router.navigate(['']);
      alert('Sesi Reset Password Anda telah habis');
    }
  }

  setErrors(error: any): void {
    Object.keys(error).forEach(fieldName => {
      this.form.controls[fieldName].setErrors({server: error[fieldName]});
    })
  }
}
