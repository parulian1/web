import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import * as Flickity from 'flickity';
import {BannerService} from '@app/services/banner.service';
import {Banner} from '@app/models/banner';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input()
  banners: Array<Banner>;

  slidesConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'infinite': true,
    'autoplay': true,
    'centerMode': true,
    'autoplaySpeed': 2000,
    'variableWidth': true,
    'mobileFirst': true,
    'dots': true,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
    'touchMove': true,
    'swipeToSlide': true,
    'responsive': [
      {
        'breakpoint': 1024,
        'slidesToShow': 3,
        'slidesToScroll': 1,
        'centerMode': true,
      }
    ]
  };

  constructor() { }
  ngOnInit(): void { }
}
