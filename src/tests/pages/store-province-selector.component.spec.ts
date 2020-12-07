import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProvinceSelectorComponent } from '@app/pages/store/province-selector/store-province-selector.component';

describe('StoreSideMenuComponent', () => {
  let component: StoreProvinceSelectorComponent;
  let fixture: ComponentFixture<StoreProvinceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProvinceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProvinceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
