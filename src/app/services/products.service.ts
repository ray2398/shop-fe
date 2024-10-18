import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpGenericService } from './http-generic.service';
import { Filter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http : HttpGenericService<Filter>,
  ) { }

  getProducts(data: Filter) {
    return this.http.post(`producto/all`, data).pipe(
      map((resp : any) =>{
        return resp;
      })
    )
  }
}
