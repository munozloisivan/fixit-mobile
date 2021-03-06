
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
/*
  Generated class for the UsuarioProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  private apiUrl = 'http://147.83.7.158:80/usuario/';

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }

  loginXXX(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl +'auth', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUsuario(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl +'add', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + id)
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUsuario(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + id, data)
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiUrl + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  createAviso(id,data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + id + '/addaviso', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  apoVis(rr, us) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + us + '/apoyo/' + rr, null)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
