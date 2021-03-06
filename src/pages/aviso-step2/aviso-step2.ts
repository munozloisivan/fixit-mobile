import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AvisoProvider} from "../../providers/aviso/aviso";

import {CategoriaProvider} from "../../providers/categoria/categoria";
import {MapaPage} from "../mapa/mapa";


/**
 * Generated class for the AvisoStep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-step2',
  templateUrl: 'aviso-step2.html',
})
export class AvisoStep2Page {

  avi: any; //id del aviso
  identity : {};
  avisoStep2: any; //objeto aviso step2

  categoria: any; //recogida del html
  descripcion: any; //recogida del html
  ciudad: any;
  codigoPostal: any;

  categorias: any; //listado de categorias

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private alertCtrl: AlertController,
              private categoriaRest: CategoriaProvider,
              private toastCtrl: ToastController) {

    this.avi = navParams.get("Step1id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoStep2Page');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log('step 3 usuario' + this.identity['_id']);
    console.log('step 3 aviso: ' +this.avi);
    this.getAvDetailsStep2();
    this.getCategoriaList();
  }

  getAvDetailsStep2() {
    this.avisRest.showAviso(this.avi).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.avisoStep2 = res;
      /*let alert = this.alertCtrl.create({
        title: 'Aviso Step 2' + this.avisoStep2 ,
        subTitle:  'id step2 aviso: ' + this.avi,
        buttons: ['Dismiss']
      });
      alert.present();*/
    }, (err) => {
      console.log(err);
    });
  }

  updateStep2() {
    //completamos el aviso con los datos nuevos del step 1 ()
    this.avisoStep2.categoria = this.categoria;
    this.avisoStep2.descripcion = this.descripcion;
    this.avisoStep2['datosUbicacion.ciudad'] = this.ciudad;
    this.avisoStep2['datosUbicacion.codPostal'] = this.codigoPostal;

    //actualizamos el aviso con los datos del step1
    this.avisRest.updateAviso(this.avi, this.avisoStep2).then((result) => {
      console.log('aviso actualizado: '+result);
      setTimeout(() => {
        this.okToast('¡Aviso creado correctamente! \n Podrás verlo cuando quieras en la pestaña "Avisos"');
        this.navCtrl.setRoot(MapaPage);
        this.navCtrl.popToRoot();
      }, 2000);
    }, (err) => {
      console.log(err);
    });
  }

  getCategoriaList() {
    this.categoriaRest.getAllCategorias().then((res) => {
      console.log(res);
      this.categorias = res;
    }, (err) => {
      console.log(err);
    });
  }

  okToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      cssClass: "toast-success",
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
