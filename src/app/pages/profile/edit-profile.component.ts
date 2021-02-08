import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { helpers } from "@app/shared";
import { drf, customer } from "@app/models";
import { ProfileService } from "@app/services";
import { Logger } from "@app/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertDialogComponent } from "@app/shared/alert-dialog";

/**
 * Allows the currently-logged in user to update their profile data.
 */
@Component({
  selector: "app-edit-profile",
  template: `
    <div class="edit-profile-wrapper">
      <div class="edit-profile-header">
        <h1 class="title">Edit Profile</h1>
      </div>

      <div class="edit-profile-content">
        <div class="box">
          <form [formGroup]="form">
            <div class="field">
              <label class="label">Nama Lengkap</label>
              <div class="control">
                <input
                  class="input"
                  [formControl]="fullName"
                  [class.is-danger]="fullName.invalid && (fullName.dirty || fullName.touched || submitted)"
                  placeholder="Masukan Nama Lengkap"
                />
              </div>

              <p *ngIf="fullName.invalid && (fullName.dirty || fullName.touched || submitted)" class="help is-danger">
                <span *ngIf="fullName.errors?.required"> Nama harus diisi </span>
                <span *ngIf="fullName.errors?.minlength"> Nama harus disi minimal 3 karakter</span>
              </p>
            </div>

            <div class="field">
              <label class="label">Nomor Handphone</label>

              <div class="control">
                <input
                  class="input"
                  [formControl]="phoneNumber"
                  [class.is-danger]="phoneNumber.invalid && (phoneNumber.dirty || phoneNumber.touched || submitted)"
                  placeholder="Masukan Nomor Handphone"
                />
              </div>

              <div
                *ngIf="phoneNumber.invalid && (phoneNumber.dirty || phoneNumber.touched || submitted)"
                class="help is-danger"
              >
                <div *ngIf="phoneNumber.hasError('required')"> No. Telepon harus diisi </div>
                <div *ngIf="phoneNumber.hasError('pattern')"> No. Telepon harus numerik </div>
                <div *ngIf="phoneNumber.hasError('minlength')"> No. Telepon lebih dari 10 karakter </div>
                <div *ngIf="phoneNumber.hasError('maxlength')"> No. Telepon kurang dari 15 karakter </div>
                <div *ngIf="phoneNumber.hasError('fromServer')">{{ phoneNumber.errors["fromServer"] }}</div>
              </div>
            </div>

            <div class="field">
              <label class="label">Jenis Kelamin</label>
              <div class="control">
                <label class="radio" *ngFor="let g of genders">
                  <input [formControl]="gender" type="radio" name="gender" [value]="g.value" />
                  {{ g.displayName }}
                </label>
              </div>

              <p *ngIf="gender.invalid && (gender.dirty || gender.touched || submitted)" class="help is-danger">
                Jenis kelamin harus diisi
              </p>
            </div>

            <div class="field">
              <label class="label">Tanggal Lahir</label>
              <div class="control">
                <input
                  class="input"
                  type="date"
                  [formControl]="birthDate"
                  [class.is-danger]="birthDate.invalid && (birthDate.dirty || birthDate.touched || submitted)"
                  placeholder="Masukan Tanggal Lahir"
                />
              </div>

              <p
                *ngIf="birthDate.invalid && (birthDate.dirty || birthDate.touched || submitted)"
                class="help is-danger"
              >
                Tanggal Lahir harus diisi
              </p>
            </div>

            <div class="field">
              <div class="control">
                <button class="button button--expand-full button--is-primary" (click)="save()">Submit</button>
              </div>
              <div class="control" style="margin-top: 10px;">
                <button class="button button--expand-full" (click)="goBack()">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  genders: Array<drf.Choice>;
  submitted: boolean = false;

  log = new Logger("edit-profile.component.ts");

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { genders: drf.Choice[]; profile: customer.Customer }) => {
      // set reference data
      this.genders = data.genders;
      this.initialForm(data);
    });
  }

  initialForm(data): void {
    this.form = this.fb.group({
      fullName: [
        `${data.profile?.firstName} ${data.profile?.lastName}`.trim(),
        [Validators.minLength(3)],
      ],
      phoneNumber: [data.profile?.phoneNumber,
        [
          Validators.required, Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(15)
        ]
      ],
      profile: this.fb.group({
        gender: [data.profile?.profile?.gender, []],
        birthDate: [data.profile?.profile?.birthDate, []],
      }),
    });
  }

  get fullName(): FormControl {
    return this.form.get("fullName") as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.form.get("phoneNumber") as FormControl;
  }
  get gender(): FormControl {
    return this.form.get("profile.gender") as FormControl;
  }
  get birthDate(): FormControl {
    return this.form.get("profile.birthDate") as FormControl;
  }

  save() {
    this.submitted = true;

    if (this.form.valid) {
      const dataToSubmit = this.cleanForm();

      // todo: error when profileService do update `actions`
      this.profileService.update(dataToSubmit).subscribe(
        (response) => {
          // todo: notify user their profile was updated successfully
          this.showSuccessMessage();
          this.goBack();
        },
        (error) => {
          this.log.error("something happen: ", error);
          this._handleError(error);
        }
      );
    }
  }

  cleanForm(): any {
    const result = this.form.value;
    delete result["fullName"];

    // split first+last name into separate fields
    if (this.fullName.valid && this.fullName.value) {
      const [firstName, lastName] = helpers.splitFirstLast(this.form.get("fullName").value);
      result["firstName"] = firstName || "";
      result["lastName"] = lastName || "";
    }

    return result;
  }

  goBack() {
    // todo: if form data is dirty, best to prompt the user first
    this.router.navigate(["/profile"]);
  }

  // Messages
  showSuccessMessage(msg: string = "") {
    const message = msg ? msg : "Profile berhasil diperbaharui.";
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
      this._setErrorFromServer(err.error);
    } else {
      this.showErrorMessage();
    }
  }
  _setErrorFromServer(error: any): void {
    Object.keys(error).forEach((fieldName) => {
      this.form.get(fieldName).setErrors({ fromServer: error[fieldName][0] });
    });
  }
}
