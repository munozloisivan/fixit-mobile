import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AvisoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvisoProvider {

  private apiUrl = 'http://147.83.7.158:80/aviso/';

  constructor(public http: HttpClient) {
    console.log('Hello AvisoProvider Provider');
  }


  getAvisosUsuario() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'usuario/' +  '5a54ef1ff317590001a981ec')
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
