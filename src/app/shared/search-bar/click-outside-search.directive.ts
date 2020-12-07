import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutsideSearch]'
})
export class ClickOutsideSearchDirective {
  @Output() appClickOutsideSearch = new EventEmitter<any>();

  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public clickedOutside(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutsideSearch.emit(true);
    }
  }

}
