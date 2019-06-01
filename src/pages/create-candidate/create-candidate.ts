import { Component, ViewChild } from '@angular/core';
import { Candidate } from '../../models/candidate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

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
    skills: [],
    email: "",
    website: ""
  };

  isReadyToSave: boolean;
  hasPicture: boolean;
  hasFile: boolean;
  //form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    /*
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    */
    this.hasPicture = false;
    this.hasFile = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCandidatePage');
  }

  getPicture() {
    console.log("getting picture");
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
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
    return 'url(' + this.candidate.images[0] + ')'
  }

  getSize() {
    return '180px 140px'
  }

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
      this.hasFile = true;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  /**
  * The user cancelled, so we dismiss without sending data back.
  */
  return() {
    this.navCtrl.setRoot("ListMasterPage");
  }

  /**
  * The user submited, so we return the data object back
  */
  submit() {
    this.navCtrl.setRoot("ListMasterPage")
    return this.candidate;
  }
}

