import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCategoryComponent } from './highlight-category.component';

describe('HighlightCategoryComponent', () => {
  let component: HighlightCategoryComponent;
  let fixture: ComponentFixture<HighlightCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
