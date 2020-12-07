import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryFilter} from "@app/models/category";
import {ProductPriceRange, ProductVendor} from "@app/models/product-lists";

@Component({
  selector: 'app-sidenav-overlay',
  templateUrl: './sidenav-overlay.component.html',
  styleUrls: ['./sidenav-overlay.component.scss']
})
export class SidenavOverlayComponent implements OnInit, AfterViewInit {
  @Output() filter = new EventEmitter<any>();
  @Input() categoryList: CategoryFilter[];
  @Input() brandList: ProductVendor[];
  @Input() priceRangeList: ProductPriceRange[];

  // sidenav-overlay
  sidenav: any;
  overlayBackground: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    this.sidenav = el.querySelector('#sidenavOverlay');
    this.overlayBackground = el.querySelector('#overlayBackground');
  }

  openNav() {
    this.overlayBackground.style.display = 'block';
    this.sidenav.style.width = '75%';
  }

  closeNav() {
    this.overlayBackground.style.display = 'none';
    this.sidenav.style.width = '0';
  }

  onFiltered($event: any) {
    this.filter.emit($event);
  }
}
