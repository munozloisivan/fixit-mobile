import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AvisoProvider} from "../../providers/aviso/aviso";
import {AvisoStep2Page} from "../aviso-step2/aviso-step2";
import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the AvisoStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-step1',
  templateUrl: 'aviso-step1.html',
})
export class AvisoStep1Page {

  identity : {};
  av : any;
  aviso: any;
  imageURI:any;
  imageFileName:any;
  image: string;
  image_status: string;
  avisoDet: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private alertCtrl: AlertController,
              private camera: Camera,
              private transfer: FileTransfer,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

    this.av = navParams.get("AVISO");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoStep1Page');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log('usuario' + this.identity['_id']);
    console.log('aviso: ' +this.av);
    this.getAvDetails();
  }

  getAvDetails() {
    this.avisRest.showAviso(this.av).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.aviso = res;
      /*let alert = this.alertCtrl.create({
        title: 'Aviso Step1 ' + this.aviso ,
        subTitle:  'id: ' + this.av,
        buttons: ['Dismiss']
      });
      alert.present();*/

    }, (err) => {
      console.log(err);
    });
  }

  updateStep1() {

    //completamos el aviso con los datos nuevos del step 1 ()

    //actualizamos el aviso con los datos del step1
    /*this.avisRest.updateAviso(this.av, this.aviso).then((result) => {
      console.log('aviso actualizado: '+result);
    }, (err) => {
      console.log(err);
    });*/

    //pasamos al siguiente paso
    this.navCtrl.push(AvisoStep2Page, {Step1id: this.av});
  }

  /*getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG, //
      mediaType: this.camera.MediaType.PICTURE, //
      targetWidth: 900,
      targetHeight: 600,
      quality: 100
    };
    this.camera.getPicture( options )
      .then(imageData => {
        this.image = 'data:image/jpeg;base64,' + imageData;   //replace ${} con + imageData
        const input = new FormData();
        input.append('image', this.image);
        this.uploadImage(this.av, input);
      })
      .catch(error =>{
        console.error( error );
      });
  }

   uploadImage(id, pic) {
    this.avisRest.uploadImage(id, pic).then((res) => {
      this.image_status = 'success';
      setTimeout(() => {this.image_status = ''; }, 1000);
    }, (err) => {
      console.log(err);
      this.image_status = 'error';
      setTimeout(() => {this.image_status = ''; }, 1000);
    });
  }*/

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.PNG
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.uploadFile();
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'ionicfile.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data", //Si gitanada NO, que sera que no, ponemos "multipart/form-data" y hay que quitar dicha gitanada del server, pq asi NO, ya hombre ya
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://147.83.7.158:80/aviso/image/' + this.av, options)
      .then((data) => {
        console.log(data+" Uploaded Successfully");
        this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
        loader.dismiss();
        this.getAvDetailsStep1();
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
  }

  getAvDetailsStep1() {
    this.avisRest.showAviso(this.av).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.avisoDet = res;

    }, (err) => {
      console.log(err);
    });
  }
}
