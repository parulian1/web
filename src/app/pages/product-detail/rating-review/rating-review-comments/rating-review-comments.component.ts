import {Component, Input, OnInit} from '@angular/core';
import {Review} from '@app/models';
import {ReviewService} from '@app/services';
import {Logger} from "@app/core";
import {ProductDetail} from "@app/models/product-detail";
import {EntityToSlugPipe} from "@app/shared/utils";

const log = new Logger('ReviewComments');

@Component({
  selector: 'app-rating-review-comments',
  templateUrl: './rating-review-comments.component.html',
  styleUrls: ['./rating-review-comments.component.scss']
})
export class RatingReviewCommentsComponent implements OnInit {
  @Input() review: Review[];
  @Input() product: ProductDetail;

  reviewerName: string;

  constructor(private pipe: EntityToSlugPipe,
              private service: ReviewService) { }

  ngOnInit(): void {
  }

  voteUp(href: string) {
    const id = this.pipe.transform(href);
    const type = 'up';

    this.service.addVote(id, type).subscribe(res => {
      this.service.fetchReviewProduct(this.pipe.transform(this.product.href)).subscribe(result => {
        this.review = result.body;
      });
    });
  }

  voteDown(href: string) {
    const id = this.pipe.transform(href);
    const type = 'down';

    this.service.addVote(id, type).subscribe(res => {
      this.service.fetchReviewProduct(this.pipe.transform(this.product.href)).subscribe(result => {
        this.review = result.body;
      });
    });
  }
}
