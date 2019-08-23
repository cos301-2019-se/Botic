import { TestBed } from '@angular/core/testing';

import { LoginControllerService } from './login-controller.service';

describe('LoginControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginControllerService = TestBed.get(LoginControllerService);
    expect(service).toBeTruthy();
  });
});
