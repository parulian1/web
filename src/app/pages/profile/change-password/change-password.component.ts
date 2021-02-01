import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertDialogComponent } from "@app/shared/alert-dialog";

import { AuthUserService } from "@app/services/auth-user.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(private service: AuthUserService, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      passwordConfirm: new FormControl("", [Validators.required]),
    });
  }
  cleanForm(): void {
    this.form.reset();
    this.submitted = false;
  }

  get oldPassword(): FormControl {
    return this.form.get("oldPassword") as FormControl;
  }
  get password(): FormControl {
    return this.form.get("password") as FormControl;
  }
  get passwordConfirm(): FormControl {
    return this.form.get("passwordConfirm") as FormControl;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.get("password").value == this.form.get("passwordConfirm").value) {
        const { oldPassword, password, passwordConfirm } = this.form.value;
        this.service
          .changePassword({
            oldPassword,
            password,
            passwordConfirm,
          })
          .subscribe(
            () => {
              this.cleanForm();
              this.showSuccessMessage();
            },
            (err) => this._handleError(err)
          );
      } else {
        this._setErrorPasswordDoesntMatch();
      }
    }
  }

  goBack(): void {
    // todo: if form data is dirty, best to prompt the user first
    this.router.navigate(["/profile"]);
  }

  // Messages
  showSuccessMessage(msg: string = "") {
    const message = msg ? msg : "Berhasil Mengubah Password Anda.";
    const status = 201;

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      panelClass: ["mt-alert--is-primary", "mt-alert--has-text-centered"],
    });
  }
  showErrorMessage(msg: string = "") {
    const message = msg ? msg : "Terjadi kesalahan, silahkan periksa kembali inputan anda.";
    const status = 400;

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      horizontalPosition: "right",
    });
  }

  // Error Handling
  _handleError(err: any): void {
    if (err.status === 400) {
      this._setErrors(err.error);
    } else {
      this.showErrorMessage();
    }
  }
  _setErrors(error: any) {
    Object.keys(error).forEach((field: any) => {
      this.form.controls[field].setErrors({ fromServer: error[field][0] });
    });
  }
  _setErrorPasswordDoesntMatch(): void {
    this.form.get("passwordConfirm").setErrors({ doesntMatch: true });
  }
}
