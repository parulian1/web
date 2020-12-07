import {Component, OnInit} from '@angular/core';
import {SlickCarouselComponent, SlickItemDirective} from 'ngx-slick-carousel';
import {ProductsService} from '@app/services/products.service';
import {Category} from "@app/models/category";
import {EntityToSlugPipe} from "@app/shared/utils";

@Component({
  selector: 'app-highlight-category',
  templateUrl: './highlight-category.component.html',
  styleUrls: ['./highlight-category.component.scss']
})
export class HighlightCategoryComponent implements OnInit {
  categories: Category[] = [];

  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 1,
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


  constructor(private service: ProductsService,
              private pipe: EntityToSlugPipe) {
  }

  ngOnInit(): void {
    this.fetchCategory();
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


  fetchCategory() {
    this.service.fetchCategoryListsByDepth().subscribe(res => {

      this.categories = res.body;
    });
  }
}
