import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioRest: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUsuario() {
    this.usuarioRest.login({email: this.email, password: this.password}).subscribe((res) => {
      console.log('okei');
    }, (err) => {
      console.log(err);
    })

  }
}
