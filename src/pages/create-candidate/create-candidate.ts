import { Component, ViewChild } from '@angular/core';
import { Firestore } from '../../providers/firestore/firestore';
import { Candidate, Account } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, AlertController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-candidate',
  templateUrl: 'create-candidate.html'
})
export class CreateCandidatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('imageInput') imageInput;


  image = ""


  candidate: Candidate = {
    id: null,
    name: "",
    image: "",
    email: "",
    description: "",
    resume_URL: "",
    is_visible: true,
    chats: {},
    interests: {},
    matches: {},
    waitlist: [],
    phone_number: "",
    address: "",
    skills: [],
    website: ""
  };

  isReadyToSave: boolean;
  hasPicture: boolean;
  hasFile: boolean;
  account: Account;
  params: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, private firestore: Firestore, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.params = navParams;
    this.account = navParams.get('account');
    this.hasPicture = false;
    this.hasFile = false;
    this.candidate.email = this.account.email;
    this.candidate.address = this.account.address;
    this.candidate.phone_number = this.account.phone_number;
  }

  // Picture upload functions
  getPicture() {
    this.imageInput.nativeElement.click();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.image = imageData;
    };
    let imageD = event.target.files[event.target.files.length - 1];
    this.candidate.image = imageD;
    reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
    this.hasPicture = true;
  }

  getProfileImageStyle() {
    return 'url(' + this.image + ')'
  }

  // Get size for picture
  getSize() {
    return '140px 180px'
  }

  // Upload file functinos
  getFile() {
    this.fileInput.nativeElement.click();
  }

  processWebFile(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let fileData = (readerEvent.target as any).result;
      //this.form.patchValue({ 'profilePic': imageData });
      this.candidate.resume_URL = fileData;
      this.presentAlert();
      this.hasFile = true;
    };

    reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
  }

  // Alert upload success
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Upload Success!',
      buttons: [{
        text: 'Confirm',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
      ]
    });
    await alert.present();
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

    this.firestore.createCandidate(this.account.id, this.candidate).then(_ =>{
      return this.firestore.getAccount(this.account.id);
    }).then(acc => {
      params['account'] = acc;
      params['candidateProfileRef'] = acc.candidate_id;
      params['projectProfileRef'] = acc.project_id;
      if (acc.project_id == null) {
        return null;
      } else {
        return this.firestore.getProjectProfileFromID(acc.project_id.id);
      }
    }).then(projectProfile => {
      params['projectProfile'] = projectProfile;
      let acc = params['account'];
      if (acc.candidate_id == null) {
        return null;
      } else {
        return this.firestore.getCandidateProfileFromID(acc.candidate_id.id);
      }
    }).then(candidateProfile => {
      params['candidateProfile'] = candidateProfile;
    }).then(_ => {
      loading.dismiss();
      this.navCtrl.setRoot("TabsPage", params);
    });
  }

  /**
  * 
  *Tag
 **/
  deleteTag(t: string, type: string) {
    var newTags = []
    for (var i = 0; i < this.candidate.skills.length; i++) {
      if (this.candidate.skills[i] != t) {
        newTags.push(this.candidate.skills[i]);
      }
    }
    this.candidate.skills = newTags;

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
              this.candidate.skills.push(data.tag);
            } else if (type === "tags") {
            }
          }
        }
      ]
    });
    alert.present();
  }
}

