import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvisoProvider } from "../../providers/aviso/aviso";

/**
 * Generated class for the AvisoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-detail',
  templateUrl: 'aviso-detail.html',
})
export class AvisoDetailPage {

  avisoIdentifier: any;
  aviso: any;

  codPostal: any;
  calle: any;
  ciudad: any;
  longitud: any;
  latitud: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisoRest: AvisoProvider) {

    this.avisoIdentifier = navParams.get("avID");
    this.aviso = {}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoDetailPage');
    console.log('aviso id: ' + this.avisoIdentifier);
    this.getAvisoDetails(this.avisoIdentifier);
  }


  getAvisoDetails(av) {
    this.avisoRest.showAviso(av).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.aviso = res;
      console.log(this.aviso);
      this.calle = this.aviso.datosUbicacion['calle'];
      this.codPostal = this.aviso.datosUbicacion['codPostal'];
      this.ciudad = this.aviso.datosUbicacion['ciudad'];
      this.longitud = this.aviso.localizacion['lon'];
      this.latitud = this.aviso.localizacion['lat'];
      console.log(this.calle + this.codPostal + this.longitud);
    }, (err) => {
      console.log(err);
    });
  }

}
