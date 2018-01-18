import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AvisoProvider} from "../../providers/aviso/aviso";

/**
 * Generated class for the AvisoStep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-step3',
  templateUrl: 'aviso-step3.html',
})
export class AvisoStep3Page {

  avis: any;
  identity : {};
  avisoStep3: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoStep3Page');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log('step 3 usuario' + this.identity['_id']);
    console.log('step 3 aviso: ' +this.avis);
    this.getAvDetailsStep3();
  }

  getAvDetailsStep3() {
    this.avisRest.showAviso(this.avis).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.avisoStep3 = res;
      let alert = this.alertCtrl.create({
        title: 'Aviso Step3 ' + this.avisoStep3 ,
        subTitle:  'id step3: ' + this.avis,
        buttons: ['Dismiss']
      });
      alert.present();

    }, (err) => {
      console.log(err);
    });
  }

}
