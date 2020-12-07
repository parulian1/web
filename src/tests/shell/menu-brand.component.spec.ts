import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBrandComponent } from '@app/shell/header/menu-brand/menu-brand.component';

describe('MenuBrandComponent', () => {
  let component: MenuBrandComponent;
  let fixture: ComponentFixture<MenuBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
