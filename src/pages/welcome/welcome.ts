import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage} from "../login/login";
import { RegistroPage } from "../registro/registro";
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  login() {
    this.navCtrl.push(LoginPage);
  }

  registro() {
    this.navCtrl.push(RegistroPage);
  }
}
