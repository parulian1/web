import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationService} from "@app/services/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Output() changePage = new EventEmitter<any>(true);
  // pager object
  pager: any = {};
  pages: any = {};
  lastOne: number;
  last: number;

  constructor(private pagerService: PaginationService) {
  }

  ngOnInit(): void {
    this.setPage(1)
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItems, page);
    this.pages = this.pager.pages
    this.lastOne = this.pager.totalPages - 1;
    this.last = this.pager.totalPages;
    this.changePage.emit(page);
  }

}
