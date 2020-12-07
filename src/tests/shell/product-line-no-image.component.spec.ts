import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLineNoImageComponent } from '@app/shell/product-line-no-image/product-line-no-image.component';

describe('ProductLineNoImageComponent', () => {
  let component: ProductLineNoImageComponent;
  let fixture: ComponentFixture<ProductLineNoImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLineNoImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineNoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
