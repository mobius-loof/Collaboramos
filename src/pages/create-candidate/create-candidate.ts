import { Component, ViewChild } from '@angular/core';
import { Firestore } from '../../providers/firestore/firestore';
import { Candidate } from '../../models/candidate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-candidate',
  templateUrl: 'create-candidate.html'
})
export class CreateCandidatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('imageInput') imageInput;


  candidate: Candidate = {
    id: null,
    name: "",
    image: "",
    description: "",
    resume_URL: "",
    is_visible: true,
    //tags: ["UCSD"],
    chats: {},
    interests: {},
    matches: {},
    waitlist: [],
    phone_number: "",
    address: "",
    skills: ["js", "python"],
    email: "",
    website: ""
  };

  isReadyToSave: boolean;
  hasPicture: boolean;
  hasFile: boolean;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, public camera: Camera, private firestore: Firestore) {
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
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.candidate.image = ('data:image/jpg;base64,' + data);
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
      this.candidate.image = imageData;
      console.log("Received Picture");
    };
    reader.readAsDataURL(event.target.files[event.target.files.length-1]);
    this.hasPicture = true;
  }

  getProfileImageStyle() {
    return 'url(' + this.candidate.image+ ')'
  }

// Get size for picture
  getSize() {
    return '180px 140px'
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
      this.presentAlert()
      this.hasFile = true;
    };

    reader.readAsDataURL(event.target.files[0]);
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
      //this.firestore.createCandidate(this.candidate);
      this.navCtrl.setRoot("TabsPage")
      return this.candidate;
    }

    /**
    * 
    *Tag
   **/
    deleteTag(t: string, type: string) {
        var newTags = []
        if (type === "skills") {
            for (var i = 0; i < this.candidate.skills.length; i++) {
                if (this.candidate.skills[i] != t) {
                    newTags.push(this.candidate.skills[i]);
                }
            }
            this.candidate.skills = newTags;
        } /*else if (type === "tags") {
            for (var i = 0; i < this.candidate.tags.length; i++) {
                if (this.candidate.tags[i] != t) {
                    newTags.push(this.candidate.tags[i]);
                }
            }
            this.candidate.tags = newTags;
        }*/

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
                            //this.candidate.tags.push(data.tag);
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}

