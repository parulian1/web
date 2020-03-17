import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Form, Validators, AbstractControl} from '@angular/forms';
import {RegisterService} from "@app/services/register.service";
import {User} from "@app/models/user";
import {props, Store} from "@ngrx/store";
import {AppState} from "@app/store/state/app.state";
import {Register} from "@app/store/actions/auth.actions";


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
  isLoading = false;
  errorMessage: string = '';

  user: User = new User();

  @Input()
  public formType: String;

  constructor(private service: RegisterService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.isRegisterPage = false;

    this.initForm();

    this.label = (this.formType == 'Login') ? 'Email / Nomor Handphone' : 'Email';

    if (this.formType != 'Login') {
      this.isRegisterPage = true;
      this.currentMode = 'Daftar';
    } else {
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

    if (this.formType == 'Login' || this.formType == 'Register') {
      this.mtForm = new FormGroup({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        password: new FormControl('', Validators.required),
        tnc: new FormControl('', Validators.required)
      });
    }
  }

  onSubmit() {
    if (this.formType == 'Register') {
      this.isLoading = true;

      const payload = {
        email: this.user.email,
        password: this.user.password
      };

      this.store.dispatch(new Register(payload));

      this.store.select(state => state).subscribe(data => {
        console.log(data.auth.errorMessage);
        this.errorMessage = data.auth.errorMessage
      });


    }
  }

}
