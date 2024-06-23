import { TestBed } from '@angular/core/testing';

import { IrealService } from './ireal.service';

describe('IrealService', () => {
  let service: IrealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
