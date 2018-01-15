import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {AvisoProvider } from "../../providers/aviso/aviso";
import {AvisoDetailPage} from "../aviso-detail/aviso-detail";

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

  usuario: any;
  avisos: any;
  avisos_creados : any;
  avisos_apoyados: any;
  public aviso_type: string;
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
    this.getUsuarioDetails();
    this.selectedCreados();
  }

  getUsuarioDetails() {
    this.usuarioRest.showUsuario(this.identity['_id']).then((res) => {
      console.log(res);
      this.usuario = res;
      this.avisos = this.usuario['avisos'];
      console.log(this.avisos);
      this.avisos_creados = this.avisos['creados'];
      console.log('avisos creados: ' +this.avisos_creados);
      this.avisos_apoyados = this.avisos['apoyados'];
    }, (err) => {
      console.log(err);
    });
  }

  selectedCreados() {
    this.aviso_type = 'cre';
    console.log('tipo seleccionado:' +this.aviso_type);
  }

  selectedApoyados() {
    this.aviso_type = 'apo';
    console.log('tipo seleccionado:' +this.aviso_type);
  }

  goToDetail(aviso) {
    this.navCtrl.push(AvisoDetailPage,{avID: aviso});
  }

}
