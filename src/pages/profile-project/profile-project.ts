import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
<<<<<<< HEAD:src/pages/profile-candidate/profile-candidate.ts
  selector: 'page-profile-candidate',
  templateUrl: 'profile-candidate.html',
})
export class ProfileCandidatePage {
=======
  selector: 'page-profile-project',
  templateUrl: 'profile-project.html',
})
export class ProfileProjectPage {
>>>>>>> Renamed profile to profile-project:src/pages/profile-project/profile-project.ts

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileProjectPage');
  }

}
