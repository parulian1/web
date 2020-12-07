import { TestBed } from '@angular/core/testing';

import { AuthUserService } from '@app/services/auth-user.service';

describe('RegisterService', () => {
  let service: AuthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
