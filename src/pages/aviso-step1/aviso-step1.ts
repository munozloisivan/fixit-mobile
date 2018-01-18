import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AvisoProvider} from "../../providers/aviso/aviso";
import {AvisoStep2Page} from "../aviso-step2/aviso-step2";

/**
 * Generated class for the AvisoStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-step1',
  templateUrl: 'aviso-step1.html',
})
export class AvisoStep1Page {

  identity : {};
  av : any;
  aviso: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private alertCtrl: AlertController) {

    this.av = navParams.get("AVISO");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoStep1Page');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log('usuario' + this.identity['_id']);
    console.log('aviso: ' +this.av);
    this.getAvDetails();
  }

  getAvDetails() {
    this.avisRest.showAviso(this.av).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.aviso = res;
      let alert = this.alertCtrl.create({
        title: 'Aviso Step1 ' + this.aviso ,
        subTitle:  'id: ' + this.av,
        buttons: ['Dismiss']
      });
      alert.present();

    }, (err) => {
      console.log(err);
    });
  }

  updateStep1() {
    this.navCtrl.push(AvisoStep2Page, {Step1id: this.av})
  }


}
