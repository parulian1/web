import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertDialogComponent } from "@app/shared/alert-dialog";

@Component({
  selector: "app-verify-user-component",
  template: ``,
  styles: [``],
})
export class VerifyConfirmComponent implements OnInit {
  constructor(private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.handleSuccess();
  }

  handleSuccess(): void {
    const message = "Akun anda berhasil terverifikasi";
    const status = 201;

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      panelClass: ["mt-alert--is-primary", "mt-alert--has-text-centered"],
    });

    this.router.navigate(["profile"]);
  }
}
