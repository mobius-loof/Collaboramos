import { Component, ViewChild } from '@angular/core';
import { Firestore } from '../../providers/firestore/firestore';
import { Candidate } from '../../models/candidate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, AlertController, NavParams } from 'ionic-angular';

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
  acccount: Account;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, private firestore: Firestore, private navParams: NavParams) {
    this.hasPicture = false;
    this.hasFile = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCandidatePage');
  }

  // Picture upload functions
  getPicture() {
    /*
    console.log("getting picture");
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
          this.candidate.images.push('data:image/jpg;base64,' + data);
          this.hasPicture = true;
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
      console.log("Received Picture");
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
    console.log("getting file");
    this.fileInput.nativeElement.click();
  }

  processWebFile(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let fileData = (readerEvent.target as any).result;
      //this.form.patchValue({ 'profilePic': imageData });
      this.candidate.resume_URL = fileData;
      console.log("Received Resume");
      console.log(fileData);
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
    this.navCtrl.setRoot("CreateProfilePage");
  }

  /**
  * The user submited, so we return the data object back
  */
  submit() {
    this.firestore.createCandidate(this.account.id, this.candidate);
    this.navCtrl.setRoot("TabsPage")
    return this.candidate;
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

