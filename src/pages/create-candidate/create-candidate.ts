import { Component, ViewChild } from '@angular/core';
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
    id: "",
    name: "",
    files: [],
    images: [],
    description: "",
    resumeURL: "",
    is_visible: true,
    tags: [],
    chats: {},
    interests: {},
    matches: {},
    waitlist: [],
    phone: "",
    address: "",
    skills: []
  };

  isReadyToSave: boolean;
  hasPicture: boolean;
  hasFile: boolean;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, public camera: Camera) {
    this.hasPicture = false;
    this.hasFile = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCandidatePage');
  }

// Picture upload functions
  getPicture() {
    console.log("getting picture");
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.candidate.images.push('data:image/jpg;base64,' + data);
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.imageInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.candidate.images.push(imageData);
      console.log("Received Picture");
    };
    reader.readAsDataURL(event.target.files[0]);
    this.hasPicture = true;
  }

  getProfileImageStyle() {
      return 'url(' + this.candidate.images[this.candidate.images.length - 1] + ')'
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
      this.candidate.resumeURL = fileData;
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
    this.navCtrl.setRoot("TabsPage");
  }

  /**
  * The user submited, so we return the data object back
  */
  submit() {
    this.navCtrl.setRoot("TabsPage")
    return this.candidate;
  }
}

