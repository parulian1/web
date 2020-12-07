import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStoreComponent } from '@app/pages/store/change-store/change-store.component';

describe('StoreComponent', () => {
  let component: ChangeStoreComponent;
  let fixture: ComponentFixture<ChangeStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
