import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  tags = ['tag1', 'tag2'];
  frameworks = ['f1', 'f2'];
  isEdit: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private inAppBrowser: InAppBrowser) {
    this.isEdit = false;
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

  presentPrompt(type: string){
    let myString: string = ""
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
              this.tags.push(data.tag);
            } else if (type === "frameworks") {
              this.frameworks.push(data.tag);
            }
          }
        }
      ]
    });
    alert.present();
  }


}
