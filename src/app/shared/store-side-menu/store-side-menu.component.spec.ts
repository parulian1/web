import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSideMenuComponent } from './store-side-menu.component';

describe('StoreSideMenuComponent', () => {
  let component: StoreSideMenuComponent;
  let fixture: ComponentFixture<StoreSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
