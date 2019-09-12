import { TestBed } from '@angular/core/testing';

import { GenericService } from './service/generic.service';

describe('GenericService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericService = TestBed.get(GenericService);
    expect(service).toBeTruthy();
  });
});
