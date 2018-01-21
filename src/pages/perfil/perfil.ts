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

    if (!this.usuario.nombre || !this.usuario.apellidos || !this.usuario.dni ||  !this.usuario.alias || !this.usuario.telefono || !this.usuario.codigoPostal) {
      console.log('necesario completar perfil');
      this.presentConfirm();
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
    let nombre = this.usuario.nombre;
    let apellidos = this.usuario.apellidos;
    let dni = this.usuario.dni;
    let telefono = this.usuario.telefono;
    let codigoPostal = this.usuario.codigoPostal;
    let alias = this.usuario.alias;


    if (!nombre || !apellidos || !dni) {
      if ((!nombre && !apellidos && !dni))
      this.camposObligatorios = '<ul><li>Nombre</li><li>Apellidos</li><li>Dni</li></ul>';
      else if (!nombre && !apellidos) {
        this.camposObligatorios = '<ul><li>Nombre</li><li>Apellidos</li></ul>';
      }
      else if (!dni) {
        this.camposObligatorios = '<ul><li>Dni</li></ul>';
      }

    }
    if (!telefono || !codigoPostal || !alias) {
      if (!telefono && !codigoPostal && !alias) {
        this.camposOptativos = '<ul><li>Teléfono</li><li>Código postal</li><li>Alias</li></ul>';
      }
      else if (!telefono && !codigoPostal) {
        this.camposOptativos = '<ul><li>Teléfono</li><li>Código postal</li></ul>';
      }
      else if (!alias) {
        this.camposOptativos = '<ul><li>Alias</li></ul>';
      }
    }

    if (!this.camposObligatorios && !this.camposOptativos) {
      this.msg = '<p>Para poder utilizar todas las funcionalidades debes completar todos tus datos personales</p> ' +
        '<p><b>Campos obligatorios: </b></p>' + this.camposObligatorios +
        '<p><b>Campos optativos: </b></p>' + this.camposOptativos;
    }
    else if (!this.camposObligatorios) {
      this.msg = '<p>Para poder utilizar todas las funcionalidades debes completar todos tus datos personales</p> ' +
        '<p><b>Campos optativos: </b></p>' + this.camposOptativos;
    }
    else if (!this.camposOptativos) {
          this.msg = '<p>Para poder utilizar todas las funcionalidades debes completar todos tus datos personales</p> ' +
                     '<p><b>Campos obligatorios: </b></p>' + this.camposObligatorios;
      }


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

