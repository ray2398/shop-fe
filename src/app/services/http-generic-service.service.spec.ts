import { TestBed } from '@angular/core/testing';

import { HttpGenericServiceService } from './http-generic-service.service';

describe('HttpGenericServiceService', () => {
  let service: HttpGenericServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGenericServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
