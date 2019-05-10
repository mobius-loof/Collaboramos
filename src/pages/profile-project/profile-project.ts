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
  selector: 'page-profile-project',
  templateUrl: 'profile-project.html',
})
export class ProfileProjectPage {

  isEdit: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isEdit = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileProjectPage');
  }

  setIsEdit(isEdit: boolean, discard: boolean) {
    this.isEdit = isEdit;
  }

}
