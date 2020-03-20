import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {ForgotPassword} from "@app/store/actions/auth.actions";

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit, DoCheck {
  isLoading = false;
  public mtForgotPasswordForm: FormGroup;
  public isButtonDisabled: boolean;


  constructor(private store: Store<AppState>) {
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
    this.store.dispatch(new ForgotPassword(email));
  }
}
