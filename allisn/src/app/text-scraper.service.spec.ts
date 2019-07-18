import { TestBed } from '@angular/core/testing';

import { TextScraperService } from './text-scraper.service';

describe('TextScraperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextScraperService = TestBed.get(TextScraperService);
    expect(service).toBeTruthy();
  });
});
