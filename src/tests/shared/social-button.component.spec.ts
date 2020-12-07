import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialButtonComponent } from '@app/shared/social-button/social-button.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('SocialButtonComponent', () => {
  let component: SocialButtonComponent;
  let fixture: ComponentFixture<SocialButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
      declarations: [ SocialButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
