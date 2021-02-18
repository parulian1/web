import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { HomeVideoService } from '@app/services';
import { IYoutubeOembed } from '@app/models';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '@app/pages/product-detail/video-dialog';

@Component({
  selector: 'app-video-card',
  template: `
    <div
      *ngIf="isValid"
      class="video-cell" (click)="popUpVideo()"
      #videoCell>
      <div class="item">
        <span class="thumbnail">
          <img
            [src]="videoData?.thumbnail_url"
            [alt]="videoData?.title"/>
        </span>
      </div>
      <img src="../../../assets/ic_play.svg" class="play-icon" alt="play-icon"/>
    </div>
  `,
  styles: [`
    .video-cell {
      width: 566px;
      height: 317px;
      margin-right: 24px;
      border-radius: var(--border-radius);
      display: flex;
      cursor: pointer;
    }

    .item {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
    }

    .thumbnail {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      object-fit: cover;
    }

    img.play-icon {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 42%;
      margin: 0 260px;
    }

    .video-cell:hover img.play-icon {
      opacity: 0.5;
    }

    @media only screen and (max-width: 500px) {
      .video-cell {
        width: 100vw;
        height: 190px;
        margin: 0;
        justify-content: center;
      }
    }
  `]
})
export class VideoCardComponent implements OnInit {
  @Input() videoId: string;
  @Output() isVideoAvailable = new EventEmitter<any>();

  @ViewChild('videoCell') videoCell: any;

  videoData: IYoutubeOembed;
  isValid = false;

  constructor(private service: HomeVideoService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.videoId) {
      this.fetchVideoDetails();
    }
  }

  fetchVideoDetails() {
    this.service.getOembedData(this.videoId).subscribe(result => {
      if (result.status === 200) {
        if (result.body) {
          this.isValid = true;
          this.videoData = result.body;
        }
      }
    }, error => {
      this.isValid = false;
      this.isVideoAvailable.emit(false);
    })
  }

  popUpVideo() {
    this.dialog.open(VideoDialogComponent, {
      data: {
        id: this.videoId,
        name: this.videoData?.title,
        width: this.videoData?.thumbnail_width,
        height: this.videoData?.thumbnail_height
      },
      width: '480',
      height: 'auto'
    })
  }
}
