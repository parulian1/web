import {Component, OnInit} from '@angular/core';
import {BrandService} from '@app/services/brand.service';
import {Brand} from '@app/models/brand';
import {Logger} from '@app/core';

const log = new Logger('BrandComponent');

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Array<Brand>;
  slideConfig = {
    'slidesToShow': 2,
    'slidesToScroll': 1,
    'rows': 2,
    'slidesPerRow': 1,
    'mobileFirst': true,
    'variableWidth': true,
    'infinite': false,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  };

  constructor(private brandService: BrandService) {
  }

  afterChange(e: any) {
    if (e.slick.$prevArrow[0].classList.contains('slick-disabled')) {
      e.slick.$prevArrow[0].style.display = 'none';
    } else {
      e.slick.$prevArrow[0].style.display = 'block';
    }

    if (e.slick.$nextArrow[0].classList.contains('slick-disabled')) {
      e.slick.$nextArrow[0].style.display = 'none';
    } else {
      e.slick.$nextArrow[0].style.display = 'block';
    }
  }

  beforeChange(e: any) {
    if (e.slick.$prevArrow[0].classList.contains('slick-disabled')) {
      e.slick.$prevArrow[0].style.display = 'none';
    } else {
      e.slick.$prevArrow[0].style.display = 'block';
    }
  }

  slickInit(e: any) {
    if (e.slick.$prevArrow[0].classList.contains('slick-disabled')) {
      e.slick.$prevArrow[0].style.display = 'none';
    }
  }

  ngOnInit(): void {
    this.getHomeBrand();
  }

  getHomeBrand() {
    this.brandService.getHomeBrand(true).subscribe(data => {
      this.brands = data.body;
      log.debug(this.brands);
    });
  }

  getDefaultImage(event: any) {
    event.target.src = '//via.placeholder.com/638';
  }

}
