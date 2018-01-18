import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the CrearAvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-aviso',
  templateUrl: 'crear-aviso.html',
})
export class CrearAvisoPage {
  imageURL
  base64Image

  constructor() {}
  takePhoto(){
    Camera.getPicture().then((imageData) => {
      this.imageURL = imageData
    }, (err) => {
      console.log(err);
    });
  }

  accessGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
