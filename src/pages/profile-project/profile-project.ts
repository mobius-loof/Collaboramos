import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Firestore } from '../../providers/firestore/firestore'
import { Project, Account } from '../../models';

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

  private isEdit: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser,
              private firestore: Firestore) {
    this.isEdit = false;
  }

  // Lifecycle method that guards html from loading before profile and account are loaded
  ionViewCanEnter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.getAccount('kgchjTGLVQGAdjzkvtCy').then(account => {
        this.account = account;
        return this.firestore.getProjectProfileFromID(account.project_id.id).then(profile => {
          this.profile = profile;
        });
      }).then(_ => {
        resolve(true);
      });
    });
  }

  setIsEdit(isEdit: boolean, discard: boolean) {
    this.isEdit = isEdit;
  }

  deleteSkill(skill: string){
    var newSkills=[];
    for(var i=0;i<this.profile.skills.length;i++){
      if(this.profile.skills[i] != skill){
        newSkills.push(this.profile.skills[i]);
      }
    }
    this.profile.skills = newSkills;
  }

  deleteFramework(framework: string){
    var newFrameworks=[];
    for(var i=0;i<this.profile.frameworks.length;i++){
      if(this.profile.frameworks[i] != framework){
        newFrameworks.push(this.profile.frameworks[i]);
      }
    }
    this.profile.frameworks = newFrameworks;
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

  presentPrompt(type: string){
    let alert = this.alertCtrl.create({
      title: 'Add Tag',
      inputs: [
        {
          //TODO dynamic change skill vs framework
          name: 'tag',
          placeholder: 'short tag description'
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
            if (type === "skills") {
              this.profile.skills.push(data.tag);
            } else if (type === "frameworks") {
              this.profile.frameworks.push(data.tag);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
