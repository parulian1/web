import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import * as Flickity from "flickity";
import {BannerService} from "@app/services/banner.service";
import {Banner} from "@app/models/banner";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {
  public banner: Array<Banner> = [];

  date = new Date();
  validFrom: Date;
  validTo: Date;
  isShown: boolean = false;

  constructor(private el: ElementRef,
              private bannerService: BannerService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setupBanner();
    console.log('currDate', this.date);

    this.bannerService.getMainBanners().subscribe(res => {
      this.banner = res;
      for(let item of this.banner){
        this.isShown = false;
        this.validFrom = new Date(item.validFrom);
        this.validTo = new Date(item.validTo);

        this.isShown = (this.validFrom.getTime() >= this.date.getTime()) && (this.validTo.getTime() <= this.date.getTime());

      }
    })

  }

  setupBanner(){
    const el = this.el.nativeElement;

    const elem = el.querySelector('.main-carousel');
    new Flickity(elem, {
      wrapAround: true,
      autoPlay: true,
      cellAlign: 'center'
    })
  }

}
