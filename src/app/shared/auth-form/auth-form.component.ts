import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Form, Validators, AbstractControl} from '@angular/forms';
import {AuthUserService} from "@app/services/auth-user.service";
import {User} from "@app/models/user";
import {props, Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {Login, Register} from "@app/store/actions/auth.actions";


@Component({
  selector: 'app-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, DoCheck {
  public label: string;
  public currentMode: string;
  public isButtonDisabled: boolean;
  public isRegisterPage: boolean;
  public mtForm: FormGroup;

  errorMessage: string = '';

  user: User = new User();

  @Input()
  public formType: String;

  constructor(private service: AuthUserService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isRegisterPage = false;
    this.label = (this.formType == 'Login') ? 'Email / Nomor Handphone' : 'Email';

    this.initForm();

    if (this.formType != 'Login') {
      this.isRegisterPage = true;
      this.currentMode = 'Daftar';
    } else {
      this.isRegisterPage = false;
      this.currentMode = 'Masuk';
    }

  }

  ngDoCheck(): void {
    this.isButtonDisabled = !this.mtForm.valid;
  }

  get email() {
    return this.mtForm.get('email');
  }

  get password() {
    return this.mtForm.get('password');
  }

  initForm() {
    this.isButtonDisabled = true;

    this.mtForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required),
    });

    if (this.formType == 'Register') {
      this.mtForm.addControl('tnc', new FormControl('', Validators.required))
    }

  }

  defaultAuth() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };

    if (this.formType == 'Register') {
      this.store.dispatch(new Register(payload));
    } else {
      this.store.dispatch(new Login(payload));
    }

  }
}
