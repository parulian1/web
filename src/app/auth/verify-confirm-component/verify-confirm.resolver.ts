import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthUserService } from "@app/services";
import { catchError } from "rxjs/operators";
import { AlertDialogComponent } from "@app/shared/alert-dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class VerifyConfirmResolver implements Resolve<any | boolean> {
  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
    const { uid, token } = route.params;
    return this.authUserService.verifyUser({ uid, token }).pipe(
      catchError((_) => {
        this.handleError();
        return of([]);
      })
    );
  }

  handleError() {
    const message = "Verifikasi anda gagal, silahkan " +
      "lakukan verifikasi manual di halaman profile anda.";

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: { message, status: 400 },
      duration: 3 * 1000, // 3 seconds
      verticalPosition: "top",
      horizontalPosition: "right",
    });

    // redirect to login
    this.router.navigate(["login"]);
  }
}
