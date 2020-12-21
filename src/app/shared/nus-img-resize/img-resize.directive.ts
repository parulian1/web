import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appImgResize]'
})
export class ImgResizeDirective implements OnInit, AfterViewInit {
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

    if(this._imgData) {
      this.setLambdaResizer(this._imgData);
    }
  }

  setImgData() {
    this._imgData = {
      src: this.nativeElement.src,
      height: this.nativeElement.clientHeight,
      width: this.nativeElement.clientWidth
    };
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
}
