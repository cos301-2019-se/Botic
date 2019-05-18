import { TestBed } from '@angular/core/testing';

import { TextScraperServiceService } from './text-scraper-service.service';

describe('TextScraperServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextScraperServiceService = TestBed.get(TextScraperServiceService);
    expect(service).toBeTruthy();
  });
});
