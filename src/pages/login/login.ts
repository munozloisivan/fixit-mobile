import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  public data: {};
  public identity: {};
  public status: string;
  public token;
  usuario = {};
  private EmailUser: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuarioRest: UsuarioProvider,
              private toastCtrl: ToastController) {

    this.email = navParams.get("EmailUser");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUsuario() {
    this.usuarioRest.loginXXX({email: this.email, password: this.password})
      .then((res) => {
          console.log("Resultado" + JSON.stringify(res));
        this.status = 'success';
        localStorage.setItem('token', JSON.stringify(res['token']));
        localStorage.setItem('identity', JSON.stringify(res['user']));
        localStorage.setItem('role', JSON.stringify(res['role']));

          this.okToast('Identificación correcta');
          //this.navCtrl.push(TabsPage);
        setTimeout(() => {
          this.navCtrl.push(TabsPage);
        }, 1500);
          console.log('okei');
          }, (err) => {
            this.status = 'error';
            this.failToast('Error al iniciar sesión. Pruebe otra vez');
            console.log(err);
          })
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

}
