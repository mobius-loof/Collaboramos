import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
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

  @ViewChild('imageInput') imageInput;
  @ViewChild('fileInput') fileInput;
  hasImage: boolean;
  image = "";
  file = ""

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser,
              private firestore: Firestore,
              private menuCtrl: MenuController) {
    this.isEdit = false;
    this.hasImage = false;
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
      image: profile.image,
      resume_URL: profile.resume_URL,
      is_visible: profile.is_visible,
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
    /*let options = {
      maximumImagesCount: 1,
      outputType: 0,
      width: 800,
      height: 800
    }*/
    this.imageInput.nativeElement.click();

  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.image = imageData;
      this.hasImage = true;
    };
    let imageD = event.target.files[event.target.files.length - 1];
    this.tempProfile.image = imageD;
    console.log(imageD);
    reader.readAsDataURL(event.target.files[0]);
  }

  uploadResume() {
    /*let options = {
      maximumImagesCount: 1,
      outputType: 0,
      width: 800,
      height: 800
    }*/
    this.fileInput.nativeElement.click();

  }

  processWebFile(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let fileData = (readerEvent.target as any).result;
      this.file = fileData;
    };
    let fileD = event.target.files[event.target.files.length - 1];
    this.tempProfile.resume_URL = fileD;
    console.log(fileD);
    reader.readAsDataURL(event.target.files[0]);
  }

  getSize() {
    return '100px 100px';
  }

  getProfileImageStyle() {
    //return 'url(' + this.form.controls['profilePic'].value + ')'
    return 'url(' + this.image + ')';
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

  openMenu() {
    this.menuCtrl.open();
  }

}
