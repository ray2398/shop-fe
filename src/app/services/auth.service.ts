import { Injectable } from '@angular/core';
import { HttpGenericServiceService } from './http-generic-service.service';
import { map } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpGenericServiceService<any>,
  ) { }

  login(data: Auth) {
    return this.http.post(`auth/login`, data).pipe(
      map((resp : any) =>{
        return resp;
      })
    )
  }

  getUser(user: number) {
    return this.http.get(`auth/${user}`).pipe(
      map((resp : any) =>{
        return resp;
      })
    )
  }

  isAuthenticated() {
    return this.http.get(`auth/isauthenticated/token`).pipe(
      map((resp : any) =>{
        return resp;
      })
    )
  }

}
