import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderBarComponent } from './reminder-bar.component';

describe('ReminderBarComponent', () => {
  let component: ReminderBarComponent;
  let fixture: ComponentFixture<ReminderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
