import { Injectable } from '@angular/core';
import { HttpGenericServiceService } from './http-generic-service.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http : HttpGenericServiceService<any>,
  ) { }

  getProducts(data: any) {
    return this.http.post(`producto/all`, data).pipe(
      map((resp : any) =>{
        return resp;
      })
    )
  }
}
