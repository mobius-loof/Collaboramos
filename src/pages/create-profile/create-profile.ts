import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})

export class CreateProfilePage {

  params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params = navParams;
  }

  toProject() {
    this.navCtrl.push("CreateProjectPage", this.params);
  }

  toCandidate() {
    this.navCtrl.push("CreateCandidatePage", this.params);
  }
}
