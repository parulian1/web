import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '@app/services/products.service';
import {Router} from '@angular/router';
import {Banner} from '@app/models/banner';
import {Brand} from '@app/models/brand';
import {getSlugFromHref} from "@app/shared/helpers";

@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.scss']
})
export class SingleBannerComponent implements OnInit {
  @Input() banner: Banner;
  @Input() brand: Brand;
  @Input() page: string;
  @Input() imgHref: string;

  constructor(private productService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  setBrand(href: string) {
    let brandName = getSlugFromHref(href)

    this.router.navigateByUrl(`products?vendor=${brandName}`).then(r => {
      if (r) {

      }
    });
  }

  goToProduct(href: string) {
    let brandName = getSlugFromHref(href)

    this.router.navigateByUrl(`products?vendor=${brandName}`).then(r => {
      if (r) {

      }
    });
  }

  changeSource($event: any) {
    $event.target.src = `assets/defaults/banner-hero.png`;
  }
}
