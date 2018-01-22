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

  avisos_apoyar: any;

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

  ionViewWillEnter() {
    this.getUsuarioDetails();
    this.selectedCreados();
  }

  getUsuarioDetails() {
    this.usuarioRest.showUsuario(this.identity['_id']).then((res) => {
      this.usuario = res;
      this.avisos = this.usuario['avisos'];
      this.avisos_creados = this.avisos['creados'];
      this.avisos_apoyados = this.avisos['apoyados'];
    }, (err) => {
      console.log(err);
    });
  }

  //funcion para recoger los que se pueden apoyar
  // declarar this.avisos_apoyar = lo que recojas;
  //para mostrar ya esta hecho <3 <3 <3





  selectedCreados() {
    this.aviso_type = 'cre';
    console.log('tipo seleccionado:' +this.aviso_type);
  }

  selectedApoyados() {
    this.aviso_type = 'apo';
    console.log('tipo seleccionado:' +this.aviso_type);
  }

  selectedToApoyar() {
    this.aviso_type = 'xx';
    console.log('tipo seleccionado:' +this.aviso_type);
    this.avisoRest.getApo(this.identity['_id']).then((res) => {
      this.avisos_apoyar = res;
    }, (err) => {
      console.log(err);
    });
  }

  goToDetail(aviso) {
    this.navCtrl.push(AvisoDetailPage,{avID: aviso, tp: this.aviso_type});
  }

  deleteAvis(avis) {

    let alert = this.alertCtrl.create({
      title: 'Eliminar aviso',
      message:  '¿Estas seguro que deseas eliminar el aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            //this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm clicked');
            this.avisoRest.deleteAvisoUsuario(this.identity['_id'], avis).then((result) => {
              this.presentLoading();
              setTimeout(() => {
                this.okToast('Aviso eliminado');
                this.getUsuarioDetails();
                this.selectedCreados();
                 this.navCtrl.setRoot(AvisosPage);
                 this.navCtrl.popToRoot();
              }, 2000);
            }, (err) => {
              this.failToast('Error, prueba de nuevo');
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  okToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'bottom',
      cssClass: "toast-success",
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  failToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Eliminando aviso",
      duration: 1900
    });
    loader.present();
  }

}
