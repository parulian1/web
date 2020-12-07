import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotFormComponent } from '@app/shared/forgot-form/forgot-form.component';
import {provideMockStore} from "@ngrx/store/testing";

describe('ForgotFormComponent', () => {
  let component: ForgotFormComponent;
  let fixture: ComponentFixture<ForgotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
      declarations: [ ForgotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
