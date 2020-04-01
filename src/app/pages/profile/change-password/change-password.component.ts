import {Component, OnInit} from '@angular/core';
import {AuthUserService} from "@app/services/auth-user.service";
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePassword} from "@app/store/actions/auth.actions";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePassForm: FormGroup;

  constructor(private service: AuthUserService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  get oldPassword() {
    return this.changePassForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }

  get repeatNewPassword() {
    return this.changePassForm.get('repeatNewPassword');
  }

  initForm() {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      repeatNewPassword: new FormControl('', Validators.required),
    })
  }

  onSubmit() {

    if (this.newPassword.value == this.repeatNewPassword.value) {
      const payload = {
        password: this.newPassword.value,
        password_confirm: this.repeatNewPassword.value,
        old_password: this.oldPassword.value
      };

      this.store.dispatch(new ChangePassword(payload));
    } else {
      alert('Your new password isn\'t match');
    }
  }

}
