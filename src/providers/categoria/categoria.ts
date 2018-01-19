import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CategoriaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriaProvider {

  private apiUrl = 'http://147.83.7.158:80/categoria/';

  constructor(public http: HttpClient) {
    console.log('Hello CategoriaProvider Provider');
  }

  getAllCategorias() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl)
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
