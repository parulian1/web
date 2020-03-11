import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Form, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, DoCheck {
  public label: String;
  public currentMode: String;
  public isButtonDisabled: boolean;
  public isRegisterPage: boolean;
  public mtForm: FormGroup;
  isLoading = false;

  @Input()
  public formType: String;

  constructor() {
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

      let email = this.email.value;
      let password = this.password.value;

      this.registerNewUser(email, password);
    }
  }


  private registerNewUser(email: String, password: String) {
     console.log('todo: register new user with nusantara api');
  }
}
