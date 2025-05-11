import { TestBed } from '@angular/core/testing';

import { LawyerListService } from './lawyer-list.service';

describe('LawyerListService', () => {
  let service: LawyerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawyerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
