import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangeEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-email',
  templateUrl: 'change-email.html',
})
export class ChangeEmailPage {
  credentials: { newEmail: string, currPass: string } = {
    newEmail: '',
    currPass: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeEmailPage');
  }

  validate() {
    //check that everything okay (should go somewhere else?)
    //this.navCtrl.setRoot("WelcomePage");
    console.log(this.credentials.newEmail + ", " + this.credentials.currPass);
  }
}
