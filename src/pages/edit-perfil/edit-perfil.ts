import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the EditPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {

  identity: {};
  email: string;
  nombre: string;
  apellidos: string;
  alias: string;
  dni: string;
  telefono: string;
  codigoPostal: string;
  puntos: number;
  participantes: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usuarioRest: UsuarioProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPerfilPage');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioDetails();
  }

  getUsuarioDetails() {
    this.usuarioRest.showUsuario(this.identity['_id']).then((res) => {
      console.log('Usuario:' + JSON.stringify(res));
      this.email = res['email'];
      this.nombre = res['nombre'];
      this.apellidos = res['apellidos'];
      this.alias = res['alias'];
      this.dni = res['dni'];
      this.telefono = res['telefono'];
      this.codigoPostal = res['codigoPostal'];
      this.puntos = res['puntos'];
      this.participantes = res['participantes'];
      //this.usuario = res;
      //console.log('this.ususario = res' + this.usuario);
      //this.usuario.email = res['email'];
      //console.log('email'  + this.usuario.email);
    }, (err) => {
      console.log(err);
    });
  }

  updateUser() {
    this.usuarioRest.updateUsuario(this.identity['_id'],
      {nombre: this.nombre,
        apellidos: this.apellidos,
        alias: this.alias,
        dni: this.dni,
        telefono: this.telefono,
        codigoPostal: this.codigoPostal})
      .then((result) => {
        this.okToast('Modificado correctamente');
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1500);
      }, (err) => {
        console.log(err);
        this.failToast('Error, prueba de nuevo');
      });
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
            this.navCtrl.pop();
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