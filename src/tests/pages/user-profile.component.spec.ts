import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AuthUserService} from '@app/services/auth-user.service';
import {AuthUserServiceStub} from '@app/services/auth-user.service.stub';
import { UserProfileComponent } from '@app/pages/profile/user-profile';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authUserServiceStub: Partial<AuthUserService>;

  beforeEach(async(() => {
    // TODO: Mock spy testing
    authUserServiceStub = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthUserService, useClass: AuthUserServiceStub}
      ],
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
