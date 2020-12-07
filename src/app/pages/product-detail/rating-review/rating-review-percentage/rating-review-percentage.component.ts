import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-review-percentage',
  template: `
    <div class="recommendation">
      <div class="recommendation-label">{{recommendation}}</div>
      <div class="recommendation-text">
        <span>Direkomendasikan</span>
      </div>
    </div>`,
  styles: [`
    .recommendation {
      width: 172px;
      height: 172px;
      border: solid 1px #E5E5E5;
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .recommendation-label {
      font-size: 48px;
      line-height: 58px;
      font-weight: bold;
    }

    .recommendation-text span {
      font-size: 12px;
      line-height: 14px;
    }

    @media only screen and (max-width: 500px) {
      :host {
        width: 30%;
      }
      .recommendation {
        width: auto;
        height: 100px;
        border: solid 1px #E5E5E5;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .recommendation-label {
        font-size: 28px;
        line-height: 34px;
        font-weight: bold;
      }

      .recommendation-text span {
        font-size: 10px;
        line-height: 13px;
      }
    }
  `]
})
export class RatingReviewPercentageComponent implements OnInit {
  @Input() recommendation: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
