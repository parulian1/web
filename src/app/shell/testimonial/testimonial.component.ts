import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import Flickity from "flickity";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;

    const elem = el.querySelector('.testi');
    new Flickity(elem, {
      groupCells: 2,
      autoPlay: true
    })
  }
}
