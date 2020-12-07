import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthUserService } from "@app/services";
import { ActivatedRoute, Router } from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;

  private uid: string;
  private token: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authUserService: AuthUserService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initTokenAndUid();
    this.title.setTitle('Reset Passwords ' + ' - Martha Tilaar Shop')

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
      const { newPassword, confirmationPassword } = this.form.value;
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
        this.form.controls['newPassword'].setErrors({'nomatch': ['New Password and Confirmation Password didnt match']});
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
