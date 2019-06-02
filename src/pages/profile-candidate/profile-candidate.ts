import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FirebaseApp } from 'angularfire2';
import { Firestore } from '../../providers/firestore/firestore'
import { Candidate, Account } from '../../models';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-candidate',
  templateUrl: 'profile-candidate.html',
})
export class ProfileCandidatePage {

  private account: Account;
  private profile: Candidate;
  private tempProfile: Candidate;

  private isEdit: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser,
              private firestore: Firestore) {
    this.isEdit = false;
    this.account = navParams.get('account');
    this.profile = this.copyCandidateProfile(navParams.get('candidateProfile'));
    this.tempProfile = this.copyCandidateProfile(navParams.get('candidateProfile'));
    this.populateProfileFromAccount(this.profile, this.account);
    this.populateProfileFromAccount(this.tempProfile, this.account);
  }

  copyCandidateProfile(profile: Candidate): Candidate {
    return {
      id: profile.id,
      name: profile.name,
      //files: Object.assign([], profile.files),
      image: profile.image,
      resume_URL: profile.resume_URL,
      is_visible: profile.is_visible,
      //tags: Object.assign([], profile.tags),
      description: profile.description,
      chats: profile.chats,
      interests: profile.interests,
      matches: profile.matches,
      waitlist: Object.assign([], profile.waitlist),
      phone_number: profile.phone_number,
      address: profile.address,
      skills: Object.assign([], profile.skills),
      email: profile.email,
      website: profile.website
    };
  }

  populateProfileFromAccount(profile: Candidate, account: Account) {
    profile.email = account.email;
    profile.phone_number = account.phone_number;
    profile.address = account.address;
  }

  setIsEdit(isEdit: boolean, discard: boolean) {
    this.isEdit = isEdit;
    if (!isEdit) {
      if (!discard){
        this.profile = this.copyCandidateProfile(this.tempProfile);
        this.firestore.updateCandidateProfile(this.profile);
      } else {
        this.tempProfile = this.copyCandidateProfile(this.profile);
      }
    }
  }

  deleteSkill(skill: string){
    var newSkills=[];
    for(var i=0;i<this.tempProfile.skills.length;i++){
      if(this.tempProfile.skills[i] != skill){
        newSkills.push(this.tempProfile.skills[i]);
      }
    }
    this.tempProfile.skills = newSkills;
  }

  pickImage() {
    let options = {
      maximumImagesCount: 1,
      outputType: 0,
      width: 800,
      height: 800
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
    })
  }

  presentWebsite() {
    this.inAppBrowser.create(this.profile.website);
  }

  presentResume() { 

  }

  presentPrompt(){
    let myString: string = ""
    let alert = this.alertCtrl.create({
      title: 'Add Skill',
      inputs: [
        {
          name: 'skill',
          placeholder: 'e.g. Webscraping, Python'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: data => {
            this.tempProfile.skills.push(data.skill);
          }
        }
      ]
    });
    alert.present();
  }

}
