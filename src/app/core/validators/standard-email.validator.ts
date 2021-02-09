import {AbstractControl, ValidatorFn} from "@angular/forms";

const STANDARD_EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;

/**
 * @deprecated since Bug #90654
 * https://gramediadigital.visualstudio.com/Bhisma/_workitems/edit/90654
 * since validation upper case can be handled by backend
 */
export const standardEmailValidator = (errorCode: string = 'standardEmail'): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value != undefined && !STANDARD_EMAIL_REGEX.test(control.value)) {
      return { [errorCode]: true }
    }
    return null;
  }
}
