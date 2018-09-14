import { TestBed, inject } from '@angular/core/testing';

import { UomService } from './uom.service';

xdescribe('UomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UomService]
    });
  });

  it('should be created', inject([UomService], (service: UomService) => {
    expect(service).toBeTruthy();
  }));
});
