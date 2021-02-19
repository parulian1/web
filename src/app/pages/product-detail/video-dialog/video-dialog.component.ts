import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContainer } from "@angular/material/dialog";

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer: ElementRef<MatDialogContainer>;
  videoHeight: number;
  videoWidth: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, width?: number, height?: number }) {
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
      this.onResize();
    }
  }
}
