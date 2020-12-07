import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "@app/services";
import {MatDialog} from "@angular/material/dialog";
import {VideoDialogComponent} from "@app/pages/product-detail/video-dialog";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string;
  @Input() product: string;
  thumbnail: string;
  title: string;
  channelId: string;
  channelIcon: string;

  constructor(private service: ProductsService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.videoId) {
      this.getVideoDetails();
    }
  }

  getVideoDetails() {
    this.service.fetchVideo(this.videoId).subscribe(result => {
      if (result) {
        this.thumbnail = result.items[0].snippet.thumbnails.high.url;
        this.title = result.items[0].snippet.title;
        this.channelId = result.items[0].snippet.channelId;
        this.getChannelImages(this.channelId);
      }
    })
  }

  getChannelImages(id: string) {
    // get channel icon
    this.service.fetchVideoChannel(id).subscribe(result => {
      this.channelIcon = result.items[0].snippet.thumbnails.high.url;
    })
  }

  popUpVideo() {
    this.dialog.open(VideoDialogComponent, {
      data: {
        id: this.videoId,
        name: this.product
      },
      width: 'auto',
      height: 'auto'
    })
  }
}
