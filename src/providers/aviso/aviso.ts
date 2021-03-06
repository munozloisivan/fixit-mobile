import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpHeaders } from "@angular/common/http";

/*
  Generated class for the AvisoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvisoProvider {

  private apiUrl = 'http://147.83.7.158:80/aviso/';
  private  apiUrlUser = 'http://147.83.7.158:80/usuario/';

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

  showAviso(id) {
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

  deleteAvisoUsuario(user, avis) {
    return new Promise((resolve, reject) => {
      this.http.delete( this.apiUrlUser + user + '/aviso/' + avis)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllAvisos() {
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

  updateAviso(id, data) {
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

  uploadImage(id, image) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'image/' + id, image, {headers: headers})
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getApo(us) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'no_apoyados/' + us)
        .map(res => res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
