import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import {EditPerfilPage} from "../edit-perfil/edit-perfil";

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

  usuario: {/*email: string,
    nombre: string,
    apellidos: string,
    alias: string,
    dni: string,
    telefono: string,
    codigoPostal: string,
    puntos: number,
    participantes: number*/};
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
              private usuarioRest: UsuarioProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioDetails();
  }

  ionViewWillEnter() {
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

  goEditPerfil() {
    this.navCtrl.push(EditPerfilPage);
  }



}
