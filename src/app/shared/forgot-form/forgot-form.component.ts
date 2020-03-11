import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit, DoCheck {
  isLoading = false;
  public mtForgotPasswordForm: FormGroup;
  public isButtonDisabled: boolean;


  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this.isButtonDisabled = !this.mtForgotPasswordForm.valid;
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

    let email = this.email.value;

    this.requestForgotPassword(email);
  }

  private requestForgotPassword(email: String) {
    console.log('Sending request change password to ', email);
  }
}
