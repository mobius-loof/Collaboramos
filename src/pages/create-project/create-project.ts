import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Project, Account } from '../../models';
import { Firestore } from '../../providers/firestore/firestore';
import { Channel } from '../../models/channel';
import { Component, ViewChild } from '@angular/core';

/**
 * Generated class for the CreateProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html',
})
export class CreateProjectPage {


  image = "";

  project: Project = {
    id: "",
    name: "",
    image: "",
    description: "",
    is_visible: true,
    skills: [],
    frameworks: [],
    chats: {},
    interests: {},
    matches: {},
    waitlist: [],
    address: "",
    email: "",
    website: "",
    phone_number: ""
  };

  @ViewChild('imageInput') imageInput;

  isReadyToSave: boolean;
  hasPicture: boolean;

  account: Account;
  params: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, private firestore: Firestore, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.params = navParams;
    this.account = navParams.get('account');
    this.hasPicture = false;
    this.project.email = this.account.email;
    this.project.address = this.account.address;
    this.project.phone_number = this.account.phone_number;
  }

  getPicture() {
    /*
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
          this.project.images.push('data:image/jpg;base64,' + data);
          this.hasPicture = true;
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      */
    this.imageInput.nativeElement.click();
    //}
  }


  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.image = imageData;
      this.hasPicture = true;
    };
    let imageD = event.target.files[event.target.files.length - 1];
    this.project.image = imageD;
    reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
  }

  getSize() {
    return '100px 100px'
  }

  getProfileImageStyle() {
    return 'url(' + this.image + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  return() {
    this.navCtrl.setRoot("CreateProfilePage", this.params);
  }

  /**
  * The user submited, so we return the data object back
  */
  submit() {
    let params = {};

    let loading = this.loadingCtrl.create({
      content: 'Creating Profile...'
    });
    loading.present();

    this.firestore.createProjectProfile(this.account.id, this.project).then(_ => {
      return this.firestore.getAccount(this.account.id);
    }).then(acc => {
      params['account'] = acc;
      params['candidateProfileRef'] = acc.candidate_ref;
      params['projectProfileRef'] = acc.project_ref;
      if (acc.project_ref == null) {
        return null;
      } else {
        return this.firestore.getProjectProfileFromID(acc.project_ref.id);
      }
    }).then(projectProfile => {
      params['projectProfile'] = projectProfile;
      let acc = params['account'];
      if (acc.candidate_ref == null) {
        return null;
      } else {
        return this.firestore.getCandidateProfileFromID(acc.candidate_ref.id);
      }
    }).then(candidateProfile => {
      params['candidateProfile'] = candidateProfile;
    }).then(_ => {
      loading.dismiss();
      this.navCtrl.setRoot("TabsPage", params);
      console.log(params);
    });
  }

  /**
   * 
   *Tag
  **/
  deleteTag(t: string, type: string) {
    var newTags = []
    if (type === "skills") {
      for (var i = 0; i < this.project.skills.length; i++) {
        if (this.project.skills[i] != t) {
          newTags.push(this.project.skills[i]);
        }
      }
      this.project.skills = newTags;
    } else if (type === "frameworks") {
      for (var i = 0; i < this.project.frameworks.length; i++) {
        if (this.project.frameworks[i] != t) {
          newTags.push(this.project.frameworks[i]);
        }
      }
      this.project.frameworks = newTags;
    }

  }

  presentPrompt(type: string) {
    let alert = this.alertController.create({
      title: 'Add ' + type.substring(0, type.length),
      inputs: [
        {
          name: 'tag',
          placeholder: 'Add a new ' + type.substring(0, type.length - 1)
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Ok',
          handler: data => {
            if (type === "skills") {
              this.project.skills.push(data.tag);
            } else if (type === "frameworks") {
              this.project.frameworks.push(data.tag);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
