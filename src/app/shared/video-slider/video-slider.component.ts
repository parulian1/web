import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IHomeVideo, IHomeVideoContents } from '@app/models';

@Component({
  selector: 'app-video-slider',
  template: `
    <div class="home-video-desktop">
      <span class="subtitle">Video</span>
      <div class="home-video-desktop-list">
        <ngx-slick-carousel
          [config]="slideConfig"
          class="home-video-desktop-carousel">
          <ng-container *ngFor="let item of videoContents; index as i">
            <app-video-card ngxSlickItem [videoId]="item.youtubeVideoId"
                            (isVideoAvailable)="isVideoAvailable($event)"></app-video-card>
          </ng-container>
        </ngx-slick-carousel>
      </div>
    </div>
    <div class="home-video-mobile">
      <span class="subtitle">Video</span>
      <div class="home-video-mobile-list">
        <ngx-slick-carousel
          [config]="slideConfigMobile"
          class="home-video-mobile-carousel">
          <div ngxSlickItem *ngFor="let item of videoContents; index as i" class="video-slide" #videoRef>
            <app-video-card [videoId]="item.youtubeVideoId"
                            (isVideoAvailable)="isVideoAvailable($event)"></app-video-card>
          </div>
        </ngx-slick-carousel>
      </div>
    </div>
  `,
  styleUrls: [`./video-slider.component.scss`]
})
export class VideoSliderComponent implements OnInit {
  @Input() homeVideo: IHomeVideo;
  @ViewChild('videoRef') videoRef: HTMLDivElement

  videoContents: IHomeVideoContents[];

  slideConfig = {
    'lazyLoad': 'ondemand',
    'slidesToShow': 2,
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
  }

  slideConfigMobile = {
    'lazyLoad': 'ondemand',
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'centerMode': false,
    'mobileFirst': true,
    'variableWidth': true,
    'infinite': false,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  }

  ngOnInit(): void {
    if (this.homeVideo) {
      this.videoContents = this.homeVideo.contentItems.filter(m => m.isActive === true);
    }
  }

  isVideoAvailable($event: any) {

  }
}
