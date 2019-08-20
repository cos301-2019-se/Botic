/**
 * File Name: secure-interceptor.service.spec.ts
 * Version number: Original
 * Author name: Lesego Mabe
 * Project name: Botic
 * Organization: Alabama Liquid Snakes
 * Related Use Cases: UC21
 * Update History: Consult GitHub Commits and Comments
 * Reviewers: 
 * 
 */

/**
 * Purpose  :  This is service intercepts all http requests sent throughout this layer and adds the relevant
 *             authentication, in the form of a JWT. This is where it is tested.
 */

import { TestBed } from '@angular/core/testing';

import { SecureInterceptorService } from './secure-interceptor.service';

describe('SecureInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureInterceptorService = TestBed.get(SecureInterceptorService);
    expect(service).toBeTruthy();
  });
});
