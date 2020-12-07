import {AbstractControl, ValidatorFn} from "@angular/forms";

const STANDARD_EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;

export const standardEmailValidator = (errorCode: string = 'standardEmail'): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value != undefined && !STANDARD_EMAIL_REGEX.test(control.value)) {
      return { [errorCode]: true }
    }
    return null;
  }
}
