import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firestore } from '../../providers'

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

  tags = ['tag1', 'tag2']

  isEdit: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firestore: Firestore) {
    this.isEdit = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileProjectPage');
    this.firestore.getCandidateProfile();
  }

  setIsEdit(isEdit: boolean, discard: boolean) {
    this.isEdit = isEdit;
  }

  deleteTag(t: string){
    var newTags=[]
    for(var i=0;i<this.tags.length;i++){
      if(this.tags[i] != t){
        newTags.push(this.tags[i])
      }
    }
    this.tags = newTags
    console.log(this.tags.length)
  }



}
