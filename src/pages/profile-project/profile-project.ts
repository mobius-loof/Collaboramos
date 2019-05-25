import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Firestore } from '../../providers/firestore/firestore'
import { Observable } from 'rxjs';
import { Project, Account } from '../../models';

import { Observable } from 'rxjs';

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
export class ProfileProjectPage implements OnInit {
  public project_profile: Observable<Project>;
  public account: Observable<Account>

  tags = ['tag1', 'tag2'];
  frameworks = ['f1', 'f2'];
  isEdit: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser,
              private firestore: Firestore) {
    this.isEdit = false;
  }

  ngOnInit() {
    console.log("hello from ngOnInit of profile-project");
    this.project_profile = this.firestore.getProjectProfile('qbt1YubEFPK64xMGOCuu').valueChanges();
    this.account = this.firestore.getAccount('kgchjTGLVQGAdjzkvtCy').valueChanges();

    /*var tempProject: Project;

    this.project_profile.subscribe(data => {
      tempProject = data;
    });

    console.log(tempProject);*/
  }

  ionViewDidLoad() {
    console.log(this.frameworks);
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
  }

  deleteFramework(f: string){
    var newTags=[]
    for(var i=0;i<this.frameworks.length;i++){
      if(this.frameworks[i] != f){
        newTags.push(this.frameworks[i])
      }
    }
    this.frameworks = newTags
  }

  addTag(){
    this.presentPrompt()
  }

  addFramework() {
    this.presentPrompt()
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
    let target = "_system";
    this.inAppBrowser.create("http://www.google.com");
  }

  presentPrompt(){
    let myString: string = ""
    let alert = this.alertCtrl.create({
      title: 'Add Tag',
      inputs: [
        {
          name: 'tag',
          placeholder: 'short tag description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.tags.push(data.tag)
          }
        }
      ]
    });
    alert.present();
  }
}
