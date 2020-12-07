import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * Applied to an anchor tag, which links to a social media page.
 * An img element will be automatically inserted into the anchor tag,
 * with the icon for the social media platform.
 *
 * Please note, the img has styles directly applied by this directive.
 * This is due to scoping on Angular's component styles **DOES NOT**
 * apply to injected content.
 *
 * This directive will raise an exception if applied to anything OTHER
 * than an anchor tag.
 *
 * {@link https://angular.io/guide/component-styles#style-scope Docs: Angular Component Styles}
 * @see HTMLAnchorElement
 */
@Directive({
  selector: '[appSocialIcon]',
})
export class SocialIconDirective implements OnInit {

  nativeElement: HTMLAnchorElement;

  constructor(el: ElementRef) {
    if (el.nativeElement instanceof HTMLAnchorElement) {
      this.nativeElement = el.nativeElement;
    } else {
      throw new Error(`appSocialIcon is only supported on HTMLAnchorElement, but got ${el.nativeElement}`);
    }
  }

  /**
   * Gets the path for the image asset that should be injected based
   * on a simple string match of the anchor tag's href.
   *
   * If no match is found, an empty string will be returned.
   */
  getAssetPath(): string {
    if (this.nativeElement.href.includes('instagram.com')) {
      return 'assets/footer/instagram.png';
    } else if (this.nativeElement.href.includes('twitter.com')) {
      return 'assets/footer/twitter.png';
    } else if (this.nativeElement.href.includes('facebook.com')) {
      return 'assets/footer/facebook.png';
    } else {

      return '';
    }
  }

  ngOnInit(): void {
    const assetPath = this.getAssetPath();
    if (!!assetPath) {
      const img = document.createElement('img');
      img.src = assetPath;
      img.alt = 'Social Media Icon';
      img.style.verticalAlign = 'middle';

      this.nativeElement.appendChild(img);
    }
  }
}
