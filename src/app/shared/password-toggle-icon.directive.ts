import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appPasswordToggleIcon]",
})
export class PasswordToggleIconDirective implements AfterViewInit {
  private show = false;

  passwordField: any;
  controlDiv: any;
  passwordIcon: any;
  icon: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initialSelector();
    this.initialEvent();
  }

  initialSelector(): void {
    this.controlDiv = this.el.nativeElement;
    this.passwordField = this.controlDiv.querySelector(".input");
    this.passwordIcon = this.controlDiv.querySelector(".icon");
    this.icon = this.passwordIcon.querySelector("i");
  }

  initialEvent(): void {
    this.passwordIcon.addEventListener("click", () => {
      this.passwordField.focus();
      this.toggle();
      this.toggleIcon();
    });
  }

  toggle(): void {
    this.show = !this.show;
    this.passwordField.setAttribute("type",
      this.show ? 'text' : 'password'
    );
  }

  toggleIcon(): void {
    this.icon.innerHTML = this.show ? "visibility_off" : "visibility";
  }
}
