import {Component, Input, OnInit} from '@angular/core';
import { HomeVideoService, ProductsService } from "@app/services";
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

  constructor(private service: HomeVideoService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.videoId) {
      this.getVideoDetails();
    }
  }

  getVideoDetails() {
    this.service.getOembedData(this.videoId).subscribe(result => {
      if (result.body) {
        this.thumbnail = result.body.thumbnail_url;
        this.title = result.body.title;
        this.channelId = result.body.author_name;
      }
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
