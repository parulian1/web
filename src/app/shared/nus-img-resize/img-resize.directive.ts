import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {
  DEFAULT_HEIGHT_BRANDS_DESKTOP,
  DEFAULT_HEIGHT_BRANDS_MOBILE,
  DEFAULT_HEIGHT_LOGO_HEADER_DESKTOP,
  DEFAULT_HEIGHT_TESTIMONIAL_DESKTOP,
  DEFAULT_WIDTH_BRANDS_DESKTOP,
  DEFAULT_WIDTH_BRANDS_MOBILE,
  DEFAULT_WIDTH_LOGO_HEADER_DESKTOP,
  DEFAULT_WIDTH_TESTIMONIAL_DESKTOP
} from '@app/models/images';

@Directive({
  selector: '[appImgResize]'
})
export class ImgResizeDirective implements OnInit, AfterViewInit {
  @Input() imgResizeType: string;

  nativeElement: HTMLImageElement;
  _imgData: { src: string, width: number, height: number, name?: string, extension?: string };

  constructor(private el: ElementRef) {
    if (el.nativeElement instanceof HTMLImageElement) {
      this.nativeElement = el.nativeElement;
    } else {
      throw new Error(`appImgResize is only supported on HTMLImageElement, but got ${el.nativeElement}`);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setImgData();

    if (this._imgData) {
      this.setLambdaResizer(this._imgData);
    }
  }

  setImgData() {
    this._imgData = {
      src: this.nativeElement.src,
      height: this.nativeElement.clientHeight,
      width: this.nativeElement.clientWidth
    };

    if (this._imgData.height === 0 || this._imgData.width === 0) {
      this.setDefaultByType();
    }

    this.parseImgSource(this._imgData);
  }

  parseImgSource(_imgData: { src: string; width: number; height: number }) {
    const slug = _imgData.src.split('/').pop();
    const matchedSlug = slug.match(/(^[a-zA-Z0-9\-\_\.]+)\./);
    if (matchedSlug) {
      const name = slug.match(/(^[a-zA-Z0-9\-\_\.]+)\./)[1];
      const extension = slug.match(/([0-9a-zA-Z]+$)/)[0];

      this._imgData.name = `${name}__w${_imgData.width}_h${_imgData.height}.${extension}`;
      this._imgData.extension = extension;
    }
  }

  setLambdaResizer(_imgData: { src: string; width: number; height: number; name?: string; extension?: string }) {
    const prefix = _imgData.src.match(/^[a-zA-Z0-9\.\-\_\:\/]+\//)[0];
    this.nativeElement.src = prefix + _imgData.name;
  }

  setDefaultByType() {
    if (this.imgResizeType) {
      switch (this.imgResizeType) {
        case 'brands-desktop' :
          this._imgData.width = DEFAULT_WIDTH_BRANDS_DESKTOP;
          this._imgData.height = DEFAULT_HEIGHT_BRANDS_DESKTOP;
          break;
        case 'brands-mobile' :
          this._imgData.width = DEFAULT_WIDTH_BRANDS_MOBILE;
          this._imgData.height = DEFAULT_HEIGHT_BRANDS_MOBILE;
          break;
        case 'testimonial-desktop' :
          this._imgData.width = DEFAULT_WIDTH_TESTIMONIAL_DESKTOP;
          this._imgData.height = DEFAULT_HEIGHT_TESTIMONIAL_DESKTOP;
          break;
        case 'logo-header-desktop' :
          this._imgData.width = DEFAULT_WIDTH_LOGO_HEADER_DESKTOP;
          this._imgData.height = DEFAULT_HEIGHT_LOGO_HEADER_DESKTOP;
          break;
      }
    }
  }
}
