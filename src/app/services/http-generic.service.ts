import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpGenericService<T> {

  constructor(
    private http: HttpClient
  ) { }

  urlBackend(url : string){
    return environment.backend + url;
  }

  get(url: string, options = {}) {
    return this.http.get(this.urlBackend(url), options);
  }

  post(url: string, body: T, options = {}) {
    return this.http.post(this.urlBackend(url), body, options);
  }

}
