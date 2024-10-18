import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpGenericService } from './http-generic.service';

describe('HttpGenericService', () => {
  let service: HttpGenericService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpGenericService],
    });
    service = TestBed.inject(HttpGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
