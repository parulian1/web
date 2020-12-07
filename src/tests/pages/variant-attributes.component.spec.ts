import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantAttributesComponent } from '@app/pages/product-detail/variant-attributes/variant-attributes.component';

describe('VariantAttributesComponent', () => {
  let component: VariantAttributesComponent;
  let fixture: ComponentFixture<VariantAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
