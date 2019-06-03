import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Firestore } from '../../providers/firestore/firestore'
import { Project, Account } from '../../models';
import { MyApp } from '../../app/app.component';

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

  private account: Account;
  private profile: Project;
  private tempProfile: Project;

  private isEdit: boolean;

  @ViewChild('imageInput') imageInput;
  hasImage: boolean;
  image = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser,
              private firestore: Firestore,
              private menuCtrl: MenuController,
              public appCom: MyApp) {
    this.isEdit = false;
<<<<<<< HEAD
=======
    this.hasImage = false;
>>>>>>> 5b8af815b2def883a05d14e970bc49ddb8876e2e
    this.account = navParams.get('account');
    this.profile = this.copyProjectProfile(navParams.get('projectProfile'));
    this.tempProfile = this.copyProjectProfile(navParams.get('projectProfile'));
    this.populateProfileFromAccount(this.profile, this.account);
    this.populateProfileFromAccount(this.tempProfile, this.account);
  }

  copyProjectProfile(profile: Project): Project {
    return {
      id: profile.id,
      name: profile.name,
      image: profile.image,
      description: profile.description,
      is_visible: profile.is_visible,
      frameworks: Object.assign([], profile.frameworks),
      skills: Object.assign([], profile.skills),
      chats: profile.chats,
      interests: profile.interests,
      matches: profile.matches,
      waitlist: Object.assign([], profile.waitlist),
      address: profile.address,
      email: profile.email,
      website: profile.website,
      phone_number: profile.phone_number
    };
  }

  populateProfileFromAccount(profile: Project, account: Account) {
    profile.email = account.email;
    profile.phone_number = account.phone_number;
    profile.address = account.address;
  }

  setIsEdit(isEdit: boolean, discard: boolean) {
    this.isEdit = isEdit;
    if (!isEdit) {
      if (!discard){
        // actually upload stuff
        this.profile = this.copyProjectProfile(this.tempProfile);
        this.firestore.updateProjectProfile(this.profile);
      } else {
        this.tempProfile = this.copyProjectProfile(this.profile);
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

  deleteFramework(framework: string){
    var newFrameworks=[];
    for(var i=0;i<this.tempProfile.frameworks.length;i++){
      if(this.tempProfile.frameworks[i] != framework){
        newFrameworks.push(this.tempProfile.frameworks[i]);
      }
    }
    this.tempProfile.frameworks = newFrameworks;
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

  getSize() {
    return '100px 100px'
  }

  getProfileImageStyle() {
    //return 'url(' + this.form.controls['profilePic'].value + ')'
    return 'url(' + this.image + ')';
  }


  presentWebsite() {
    this.inAppBrowser.create(this.profile.website);
  }

  presentPrompt(type: string){
    let input: any
    if (type === "skills") {
      input = {
        name: 'skill',
        placeholder: 'e.g. Webscraping, iOS Dev'
      }
    } else {
      input = {
        name: 'framework',
        placeholder: 'e.g. Ionic, React'
      }
    }

    let title_str: string
    title_str = (type === "skills") ? 'Add Skill' : 'Add Framework';
    let alert = this.alertCtrl.create({
      title: title_str,
      inputs: [
        input
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
            if (type === "skills") {
              this.tempProfile.skills.push(data.skill);
            } else if (type === "frameworks") {
              this.tempProfile.frameworks.push(data.framework);
            }
          }
        }
      ]
    });
    alert.present();
  }

  openMenu() {
    //have a variable that checks if edit was tapped; if was then would want to undo and reset colors
    if(!this.menuCtrl.isOpen() && !this.appCom.isEdit()) {
      this.appCom.toggleProfileSettings();
    }
    this.menuCtrl.open();
  }
}
