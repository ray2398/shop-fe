import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { HttpGenericService } from 'src/app/services/http-generic.service';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [Tab2Page],
      providers: [AuthService, HttpGenericService],
    });

    authService = TestBed.inject(AuthService);
    component = TestBed.createComponent(Tab2Page).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
