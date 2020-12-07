import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NusLinkComponent } from '@app/shared/nus-link/nus-link.component';

describe('NusLinkComponent', () => {
  let component: NusLinkComponent;
  let fixture: ComponentFixture<NusLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NusLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NusLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
