import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ProductLine} from '@app/models/product-line';
import {HighlightList} from '@app/models/highlight';
import {getSlugFromHref} from '@app/shared/helpers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.scss']
})
export class ProductLineComponent implements OnInit {
  @Input() productLines: ProductLine[];
  @Input() highlights: HighlightList[];

  slidesConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'infinite': false,
    'variableWidth': true,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  };
  mobile = false;

  constructor(private el: ElementRef, private router: Router) {
  }

  ngOnInit(): void {
    this.detectScreenSize();
  }

  getDefaultImageProduct(event: any) {
    event.target.src = 'assets/default-image.png';
  }

  navigateToProductPage(href: string) {
    const highlightSlug = getSlugFromHref(href);
    this.router.navigateByUrl(`products?highlight=${highlightSlug}`);
  }

  detectScreenSize() {
    this.mobile = window.screen.width <= 500;
  }

  slidesInit($event: { event: any; slick: any }, highlight: HighlightList) {
    if (!highlight.banner) {
      const prev = $event.slick.$prevArrow[0];
      const next = $event.slick.$nextArrow[0];
      prev.style.left = '0px';
      next.style.right = '0px';
    }
  }

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }
}
