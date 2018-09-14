import { TestBed, inject } from '@angular/core/testing';

import { TaxGroupService } from './tax-group.service';

xdescribe('TaxGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxGroupService]
    });
  });

  it('should be created', inject([TaxGroupService], (service: TaxGroupService) => {
    expect(service).toBeTruthy();
  }));
});
