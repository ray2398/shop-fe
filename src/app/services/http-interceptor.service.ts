import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storageUser = localStorage.getItem('user');

    if (storageUser) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(storageUser).token}`,
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
