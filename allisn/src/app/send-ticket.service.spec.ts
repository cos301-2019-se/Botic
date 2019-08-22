import { TestBed } from '@angular/core/testing';

import { SendTicketService } from './send-ticket.service';

describe('SendTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendTicketService = TestBed.get(SendTicketService);
    expect(service).toBeTruthy();
  });
});
