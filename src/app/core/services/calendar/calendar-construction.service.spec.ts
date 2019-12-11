import { TestBed } from '@angular/core/testing';

import { CalendarConstructionService } from './calendar-construction.service';

describe('CalendarConstructionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarConstructionService = TestBed.get(CalendarConstructionService);
    expect(service).toBeTruthy();
  });
});
