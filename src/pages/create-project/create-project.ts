import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


import { Channel } from "../../models/channel";
import { Project } from "../../models/project";


import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html'
})
export class CreateProjectPage implements Project {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  name: string;
  id: string;
  //email: string;
  //address: string;
  image: string;
  description: string;
  isVisible: boolean;
  tags: string[];
  chats: { [id: string]: Channel }

  private projectNameEmpty = 'Please fill in your project name.'

  constructor(public navCtrl: NavController,
    public projectName: string,
    //public projectEmail: string,
    //public projectAddress: string,
    public projectImage: string,
    public projectDescription: string,
    public camera: Camera) {
    this.name = projectName;
    //this.email = projectEmail;
    //this.address = projectAddress;
    this.image = projectImage;
    this.description = projectDescription;
    this.isVisible = false;
    this.tags = [];
    this.chats = {};
    //TODO: How to do tags? Chats?
    //TODO: HOW to do required framework skill and required knowledge?
  }

  cancel() {
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCandidatePage');
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }
  // Attempt to login in through our User service
  doCreateProject() {/**
    this.auth.login(this.credentials).then((resp) => {
      this.navCtrl.setRoot(MainPage);
      let toast = this.toastCtrl.create({
        message: 'You have successfully logged in!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((err) => {
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });**/
  }
}
