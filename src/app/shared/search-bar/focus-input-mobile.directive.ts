import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appFocusInputMobile]'
})
export class FocusInputMobileDirective implements OnInit, AfterViewInit{
  @Input('appFocusInputMobile') isFocused: boolean;

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.hostElement.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.hostElement.nativeElement.focus();
  }

}
