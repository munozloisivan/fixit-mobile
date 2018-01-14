import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {AvisoProvider } from "../../providers/aviso/aviso";

/**
 * Generated class for the AvisosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avisos',
  templateUrl: 'avisos.html',
})
export class AvisosPage {

  avisos : any;
  identity: {};
  categoria: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usuarioRest: UsuarioProvider,
              private avisoRest: AvisoProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisosPage');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.getAvisosCreadosList();
  }

  getAvisosCreadosList() {
    this.avisoRest.getAvisosUsuario().then((res) => {
      this.avisos = JSON.stringify(res);
      this.categoria = this.avisos['descripcion'];
      console.log('cat: ' + this.categoria);
    }, (err) => {
      console.log(err);
    });
  }

}
