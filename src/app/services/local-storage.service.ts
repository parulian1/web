import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object) { }

  public setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return "";
    }
  }

  public removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
