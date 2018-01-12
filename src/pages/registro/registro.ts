import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  private email: string;
  private password: string;
  public status: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usuarioRest: UsuarioProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  goback() {
    this.navCtrl.pop();
  }

  Register() {
    this.usuarioRest.saveUsuario({email: this.email, password: this.password}).then(
      (data) => {
        this.status = 'success';
        this.okToast('Registro correcto');
        this.Loading();
        setTimeout(() => {
          this.navCtrl.push(LoginPage, {EmailUser: this.email});
        }, 1500);
        // sessionStorage.setItem('usuario', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
        this.status = 'error';
      }
    );
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

  Loading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando Inicio",
      duration: 1500
    });
    loader.present();
  }

}
