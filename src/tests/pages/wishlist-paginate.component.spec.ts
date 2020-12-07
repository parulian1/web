import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistPaginationComponent } from '@app/pages/profile/list-wishlist/components';

describe('WishlistPaginateComponent', () => {
  let component: WishlistPaginationComponent;
  let fixture: ComponentFixture<WishlistPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
