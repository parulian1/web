import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-review-stars',
  template: `
    <div class="stars">
      <label class="stars-label">{{rating}}</label>
      <mat-star-rating
        [rating]="rating"
        [starCount]="5"></mat-star-rating>
    </div>
  `,
  styles: [`
    .stars {
      width: 172px;
      height: 172px;
      border: solid 1px #E5E5E5;
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    label {
      font-size: 48px;
      line-height: 58px;
      font-weight: bold;
    }

    @media only screen and (max-width: 500px) {
      :host {
        width: 30%;
      }
      .stars {
        width: auto;
        height: 100px;
        border: solid 1px #E5E5E5;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      label {
        font-size: 28px;
        line-height: 34px;
        font-weight: bold;
      }
    }
  `]
})
export class RatingReviewStarsComponent implements OnInit {
  @Input() rating: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
