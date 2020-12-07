import { Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { User } from "@app/models/user";
import { AppState } from "@app/store/state/app.state";
import { Login, Register } from "@app/store/actions/auth.actions";
import { AuthenticationService } from "@app/core/authentication";

import { AuthUserService } from "@app/services/auth-user.service";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertDialogComponent } from "@app/shared/alert-dialog";
import {standardEmailValidator} from "@app/core/validators";


@Component({
  selector: "app-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent implements OnInit {
  public label: string;
  public currentMode: string;
  public isRegisterPage: boolean;
  public mtForm: FormGroup;

  submitted: boolean = false;
  errorMessage = "";
  user: User = new User();

  @Input()
  public formType: string;
  @Input()
  lazyValidation: boolean = false;

  constructor(
    private service: AuthUserService,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isRegisterPage = false;
    this.label = this.formType === "Login" ? "Email / Nomor Handphone" : "Email";

    this.initForm();

    if (this.formType !== "Login") {
      this.isRegisterPage = true;
      this.currentMode = "Daftar";
    } else {
      this.isRegisterPage = false;
      this.currentMode = "Masuk";
    }
  }

  get email(): FormControl {
    return this.mtForm.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.mtForm.get("password") as FormControl;
  }

  get tnc(): FormControl {
    return this.mtForm.get("tnc") as FormControl;
  }

  initForm() {
    this.mtForm = this.fb.group({
      email: ["", [
        Validators.required,
        standardEmailValidator('email'),
      ]],
      password: ["", [Validators.required]],
    });

    if (this.formType === "Register") {
      this.mtForm.addControl("tnc", new FormControl(false, Validators.requiredTrue));
    }
  }

  defaultAuth() {
    this.submitted = true;
    const payload = { email: this.email.value, password: this.password.value };

    if (this.mtForm.valid) {
      if (this.formType === "Register") {
        this.service.createAccount(payload.email, payload.password).subscribe(
          (resp) => {
            this.authenticationService.register(resp).subscribe(() => {
              this.showSuccess();
              this.router.navigate(['.']);
            });
          },
          (error) => {
            this.showError(error);
          }
        );
      } else {
        this.service.login(payload.email, payload.password).subscribe(
          (resp) => {
            this.authenticationService.login(resp).subscribe(() => {
              this.router.navigate(['.']);
            });
          },
          (error) => {
            this.showError(error);
          }
        );
      }
    }
  }

  private showError(error: any) {
    const params = {
      status: error.status,
      message: "Failed to login/register. Please check your credentials again or try again later",
      additionalMessage: error.error.detail || error.error.message,
    };
    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: params,
      duration: 5 * 1000, // 5 seconds
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }

  private showSuccess(msg: string = "") {
    const message = msg ? msg : "Registrasi berhasil. Silahkan periksa email untuk aktivasi akun anda.";
    const status = 201;
    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 5 * 1000, // 5 seconds
      verticalPosition: "top",
      panelClass: ["mt-alert--is-primary", "mt-alert--has-text-centered"],
    });
  }

  isValidFormControl(control: FormControl): boolean {
    if (!this.lazyValidation) {
      return control.invalid && (control.dirty || control.touched || this.submitted);
    } else {
      return this.submitted && control.invalid;
    }
  }
}
