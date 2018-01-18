import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AvisoProvider} from "../../providers/aviso/aviso";
import {AvisoStep3Page} from "../aviso-step3/aviso-step3";

/**
 * Generated class for the AvisoStep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-step2',
  templateUrl: 'aviso-step2.html',
})
export class AvisoStep2Page {

  avi: any;
  identity : {};
  avisoStep2: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private alertCtrl: AlertController) {
    this.avi = navParams.get("Step1id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoStep2Page');
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log('step 3 usuario' + this.identity['_id']);
    console.log('step 3 aviso: ' +this.avi);
    this.getAvDetailsStep2();
  }

  getAvDetailsStep2() {
    this.avisRest.showAviso(this.avi).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.avisoStep2 = res;
      let alert = this.alertCtrl.create({
        title: 'Aviso Step 2' + this.avisoStep2 ,
        subTitle:  'id step2 aviso: ' + this.avi,
        buttons: ['Dismiss']
      });
      alert.present();

    }, (err) => {
      console.log(err);
    });
  }

  updateStep2() {
    this.navCtrl.push(AvisoStep3Page, {Step2id: this.avi})
  }

}
