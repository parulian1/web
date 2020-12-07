import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {AuthUserService} from "@app/services";


@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit, DoCheck {
  isLoading = false;
  public mtForgotPasswordForm: FormGroup;
  public isButtonDisabled: boolean;


  public isErrorFromInvalidEmail: boolean = false;


  constructor(
    private store: Store<AppState>,
    private service: AuthUserService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this.isButtonDisabled = !this.mtForgotPasswordForm.valid && !this.isErrorFromInvalidEmail;
  }

  get email() {
    return this.mtForgotPasswordForm.get('email');
  }

  initForm() {
    this.isButtonDisabled = true;

    this.mtForgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    })
  }

  onSubmit() {
    this.isLoading = true;
    if (this.mtForgotPasswordForm.valid) {
      this.isLoading = false;
      this.service.forgotPassword(this.email.value).subscribe(result => {
        alert('Berhasil Melakukan Reset Password, Silahkan Periksa Email Anda.');
        this.mtForgotPasswordForm.reset();
        this.isErrorFromInvalidEmail = false;
      }, error => this._handlingError(error));
    } else {
      this.isLoading = false;
      // more actions...
    }
  }

  _handlingError(error: any): void {
    if (error.status === 400) {
      // status with 400 ensure that from user doesnt found
      this.isErrorFromInvalidEmail = true;
      this.mtForgotPasswordForm.controls.email.setErrors({invalid: true});
    }
  }
}
