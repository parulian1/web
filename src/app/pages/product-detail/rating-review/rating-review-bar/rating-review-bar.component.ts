import {Component, Input, OnInit} from '@angular/core';
import {Stars} from '@app/models/product';
import {Logger} from '@app/core';

const log = new Logger('ReviewBar');

@Component({
  selector: 'app-rating-review-bar',
  template: `
    <div class="bar">
      <div class="bar-post">
      <div class="bar-review">
        <span>({{totalReview}}) Review</span>
      </div>
      <div class="bar-list">
        <div class="bar-list-item" *ngFor="let star of this.starsArr">
          <div class="bar-list-item-title">{{star[0]}}</div>
          <div class="bar-list-item-indicator" [style]="starsStyle(star)"></div>
          <div class="bar-list-item-value">{{star[1]}}</div>
        </div>
      </div></div>
    </div>
  `,
  styles: [`
    .bar {
      width: 407px;
      height: 172px;
      border: solid 1px #E5E5E5;
      border-radius: var(--border-radius);
      padding: 16px;
    }

    .bar-review {
      display: block;
      margin: 0 auto;
    }

    .bar-review span {
      font-size: 14px;
      line-height: 19px;
    }

    .bar-list {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 10px;
    }

    .bar-list-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 4px 0;
    }

    .bar-list-item-title {
      font-size: 12px;
      line-height: 14px;
      color: var(--color-secondary);
      margin-right: 8px;
    }

    .bar-list-item-indicator {
      background-color: #E5E5E5;
      border-radius: var(--border-radius);
      width: 80%;
      height: 8px;
      margin-right: 8px;
    }

    .bar-list-item-value {
      font-size: 12px;
      line-height: 14px;
      color: var(--color-secondary);
    }

    @media only screen and (max-width: 500px) {
      :host {
        width: 30%;
      }
      .bar {
        width: auto;
        height: 100px;
        border: solid 1px #E5E5E5;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        padding: 16px;
      }

      .bar-list {
        display: none;
      }
    }
  `]
})
export class RatingReviewBarComponent implements OnInit {
  @Input() stars: Stars;
  @Input() totalReview: string;

  starsArr: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.createStarsArray();
  }

  createStarsArray() {
    this.starsArr = Object.entries(this.stars);
  }

  starsStyle(star: any) {
    const startScore = Number(star[1]) / Number(this.totalReview) * 100;
    const endScore = Number(100 - startScore);

    if (startScore === 0) {
      return `background: linear-gradient(90deg, #E5E5E5 100%)`;
    } else {
      return `background: linear-gradient(90deg, #000000 ${startScore}%, #E5E5E5 ${endScore}%)`;
    }

  }
}
