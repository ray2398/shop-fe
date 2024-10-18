import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpGenericService } from 'src/app/services/http-generic.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginPage],
      providers: [AuthService, HttpGenericService],
    });

    authService = TestBed.inject(AuthService);
    component = TestBed.createComponent(LoginPage).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
