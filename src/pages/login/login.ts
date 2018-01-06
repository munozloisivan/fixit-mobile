import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioRest: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUsuario() {
    this.usuarioRest.loginXXX({email: this.email, password: this.password})
      .then((res) => {
          //this.navCtrl.push(TabsPage);
          console.log('okei');
          }, (err) => {
            console.log(err);
          })
  }
}
