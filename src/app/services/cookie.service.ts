import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  setCookie(name: string, val: string) {
    const date = new Date();

    date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));

    document.cookie = name + '=' + val + '; expires=' + date.toUTCString() + '; path=/';
  }

  getCookie(name: string) {
    const _name = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(_name) === 0) {
        return c.substring(_name.length, c.length);
      }
    }
    return '';
  }
}
