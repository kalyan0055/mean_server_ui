import { TestBed, inject } from '@angular/core/testing';

import { HsnService } from './hsn.service';

describe('HsnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HsnService]
    });
  });

  it('should be created', inject([HsnService], (service: HsnService) => {
    expect(service).toBeTruthy();
  }));
});
