import { TestBed } from '@angular/core/testing';

import { DatabaseManagerService } from './database-manager.service';

describe('DatabaseManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseManagerService = TestBed.get(DatabaseManagerService);
    expect(service).toBeTruthy();
  });
});
