import { TestBed } from '@angular/core/testing';

import { LocalStorage } from '@app/services/local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
