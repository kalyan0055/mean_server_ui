import { TestBed, inject } from '@angular/core/testing';

import { MCategoryService } from './m-category.service';

xdescribe('MCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MCategoryService]
    });
  });

  it('should be created', inject([MCategoryService], (service: MCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
