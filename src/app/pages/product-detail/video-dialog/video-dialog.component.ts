import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContainer } from "@angular/material/dialog";
import { ResponsiveBreakpointsService } from "@app/core/responsive-breakpoints";

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer: ElementRef<MatDialogContainer>;

  videoHeight: number;
  videoWidth: number;
  player: YT.Player;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, width?: number, height?: number},
              private breakpointService: ResponsiveBreakpointsService) {
  }

  ngOnInit(): void {
  }

  onResize() {
    if (this.data.width && this.data.height) {
      this.videoWidth = this.data.width;
      this.videoHeight = this.data.height;
    } else {
      this.videoWidth = Number(this.youtubePlayer.nativeElement._config.width);
      this.videoHeight = this.videoWidth * 0.6;
    }
  }

  ngAfterViewInit(): void {
    if (this.youtubePlayer) {
    }
  }

  playerReady($event: YT.Player) {
    this.player = $event;
    let playerHeight = 0;

    if (this.breakpointService.isDesktop) {
      playerHeight = 470;
    } else {
      // @ts-ignore
      playerHeight = (this.youtubePlayer.nativeElement.clientWidth * 0.6);
    }
    // @ts-ignore
    this.player.setSize(this.youtubePlayer.nativeElement.clientWidth, playerHeight);
    this.player.playVideo();
  }
}
