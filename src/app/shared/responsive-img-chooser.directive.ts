import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import {Breakpoints} from "@angular/cdk/layout";

@Directive({
  selector: '[appResponsiveImgChooser]'
})
export class ResponsiveImgChooserDirective implements OnInit {
  @Input() source: { defaultImg: string, mobileImg?: string, desktopImg?: string, tabletImg?: string };
  @Input() mobileSize: number = 425;
  @Input() tabletSize: number = 768;
  @Input() desktopSize: number = 1024;

  @Input() breakPoint: 'mobile' | 'tablet' | 'desktop';

  // isProcessed: boolean = false;
  width: number;

  defaultImg: string;
  desktopImg: string;
  mobileImg: string;
  tabletImg: string;

  // @HostListener("window:resize", ['$event'])
  // private onResize($event) {
  //   if (this.isProcessed) { problem in performance (?)
  //     this.processSetImage($event.outerWidth);
  //   }
  // }

  constructor(
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.initialImages();
    this.initialResponsive();
    this.processSetImage();
  }

  initialImages(): void {
    this.desktopImg = this.source.desktopImg || this.source.defaultImg;
    this.tabletImg = this.source.tabletImg || this.source.defaultImg;
    this.mobileImg = this.source.mobileImg || this.source.defaultImg;
  }
  initialResponsive(): void {
    this.width = window.outerWidth;
    this.el.nativeElement.src = this.source.defaultImg;
  }

  processSetImage(width = null): void {
    if (this.isDesktopSize(width || this.width)) {
      this.setSrcImage(this.desktopImg);
    } else if(this.isTabletSize(width || this.width)) {
      this.setSrcImage(this.tabletImg);
    } else {
      this.setSrcImage(this.mobileImg);
    }
    // this.isProcessed = true;
  }

  setSrcImage(value): void {
    this.el.nativeElement.src = value;
  }

  isMobileSize(value: number): boolean {
    if (this.breakPoint) {
      return this.isBreakpoint('mobile');
    }
    return value <= this.mobileSize;
  }
  isTabletSize(value: number): boolean {
    if (this.breakPoint) {
      return this.isBreakpoint('tablet');
    }
    return value >= this.tabletSize && value > this.mobileSize;
  }
  isDesktopSize(value: number): boolean {
    if (this.breakPoint) {
      return this.isBreakpoint('desktop');
    }
    return value > this.tabletSize;
  }

  isBreakpoint(display: 'mobile' | 'desktop' | 'tablet') {
    return this.breakPoint === display;
  }
}
