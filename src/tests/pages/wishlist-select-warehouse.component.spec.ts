import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSelectWarehouseComponent } from '@app/pages/profile/list-wishlist/containers/wishlist-select-warehouse/wishlist-select-warehouse.component';

describe('WishlistSelectWarehouseComponent', () => {
  let component: WishlistSelectWarehouseComponent;
  let fixture: ComponentFixture<WishlistSelectWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistSelectWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistSelectWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
