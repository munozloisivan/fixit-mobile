import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import {EditPerfilPage} from "../edit-perfil/edit-perfil";
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: any;
  identity: {};
  camposObligatorios: string;
  camposOptativos: string;
  msg : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usuarioRest: UsuarioProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

    this.usuario = {}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioDetails();

    if (!this.usuario.nombre || !this.usuario.apellidos || !this.usuario.dni) {
      console.log('necesario completar perfil');
     // this.presentConfirm();
    }
  }

  ionViewWillEnter() {
    this.getUsuarioDetails();
  }

  getUsuarioDetails() {
    this.usuarioRest.showUsuario(this.identity['_id']).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }

  goEditPerfil() {
    this.navCtrl.push(EditPerfilPage);
  }

  presentConfirm() {

    this.camposObligatorios = '<ul><li>Nombre</li><li>Apellidos</li><li>Dni</li></ul>';
    this.camposOptativos = '<ul><li>Teléfono</li><li>Código postal</li><li>Alias</li></ul>';

    if (!this.usuario.nombre || !this.usuario.apellidos || !this.usuario.dni) {
     this.msg = 'Recuerde completar los siguientes campos \n' + 'Obligatorios: \n'+  this.camposObligatorios + 'Optativos: \n'+ this.camposObligatorios;
    }

    console.log('mensage del alert: ' +this.msg);
    console.log('obligatorios: '+this.camposObligatorios);
    console.log('optativos: '+this.camposOptativos);

    let alert = this.alertCtrl.create({
      title: 'Perfil incompleto',
      message:  this.msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm clicked');
            this.goEditPerfil();
          }
        }
      ]
    });
    alert.present();
  }

  logOut() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message:  '¿Estas seguro que deseas cerrar sesión?',
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
            localStorage.clear();
            setTimeout(() => {
              this.navCtrl.setRoot(WelcomePage);
              this.navCtrl.popToRoot();
            }, 1000);
          }
        }
      ]
    });
    alert.present();
  }

  deleteUsuario() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar cuenta',
      message:  '¿Estas seguro que deseas eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm clicked');
            this.usuarioRest.deleteUsuario(this.identity['_id']).then((res) => {
              this.presentLoading();
              setTimeout(() => {
                this.okToast('Cuenta eliminada');
                this.navCtrl.setRoot(WelcomePage);
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
      content: "Borrando datos de la cuenta",
      duration: 1900
    });
    loader.present();
  }

}

