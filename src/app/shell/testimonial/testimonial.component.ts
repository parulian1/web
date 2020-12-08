import { Component, ElementRef, OnInit } from '@angular/core';
import { TestimonialService } from '@app/services/testimonial.service';
import { Testimonial } from '@app/models/testimonial';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  testimonials: Testimonial[];

  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'mobileFirst': true,
    'variableWidth': true,
    'infinite': true,
    'dots': false,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  };

  slideConfigDesktop = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'variableWidth': true,
    'dots': false,
    'infinite': true,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  };

  constructor(private el: ElementRef,
              private testimonialService: TestimonialService) {
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
    this.fetchTestimonial();
  }


  fetchTestimonial() {
    this.testimonialService.fetchTestimonial({ perPage: 250, page: 1, is_active: true }).subscribe(res => {
      this.testimonials = res.body;
    });
  }
}
