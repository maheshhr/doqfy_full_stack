import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;

  private _refreshAfterCreate = new Subject<void>();
  private _refreshAfterDelete = new Subject<void>();
  private _refreshAfterUpdate = new Subject<void>();

  get refreshAfterCreate() {
    return this._refreshAfterCreate;
  }
  get refreshAfterUpdate() {
    return this._refreshAfterUpdate;
  }
  get refreshAfterDelete() {
    return this._refreshAfterDelete;
  }
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  createProduct(form: Object) {
    return this.http.post<ProductModel>(
      this.apiUrl + 'product/create/', form
    ).pipe(tap(() => {
      return this._refreshAfterCreate.next();
    }))
  }
  updateProduct(form: Object) {
    return this.http.put<ProductModel>(
      this.apiUrl + 'product/update/', form
    ).pipe(tap(() => {
      return this._refreshAfterUpdate.next();
    }))
  }
  deleteProduct(form: Object) {
    return this.http.post<ProductModel>(
      this.apiUrl + 'product/delete/', form
    ).pipe(tap(() => {
      return this._refreshAfterDelete.next();
    }))
  }
  listProduct(form: Object) {
    return this.http.post<ProductModel>(
      this.apiUrl + 'product/list/', form
    )
  }
}


export interface ProductModel {
  id: number;
  price: number;
  name: string;
  description: string;
  iso_id: string;
  results: [];
  count: number;
  status: number;
  message: string;

}