import { TestBed } from '@angular/core/testing';

import { ZomatoService } from './zomato.service';

describe('ZomatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZomatoService = TestBed.get(ZomatoService);
    expect(service).toBeTruthy();
  });
});
