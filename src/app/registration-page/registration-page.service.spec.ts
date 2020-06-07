import { TestBed } from '@angular/core/testing';

import { RegistrationPageService } from './registration-page.service';

describe('RegistrationPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationPageService = TestBed.get(RegistrationPageService);
    expect(service).toBeTruthy();
  });
});
