import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Project } from '../../models/project';
import { Channel } from '../../models/channel';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

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
export class CreateProjectPage{

  /*
  project: {
    name: string, id: string, image: string, description: string,
    isVisible: boolean, tags: string, chats: { [id: string]: Channel }} = { 
      name: '',
      id: '',
      image: '',
      description: '',
      isVisible: true,
      tags: '',
      chats: {}
    };
  */
  project: Project = {
      id: "",
      proj_name: "",
      images:[],
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
    };

  @ViewChild('imageInput') imageInput;

  isReadyToSave: boolean;
  hasPicture: boolean;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProjectPage');
  }

  
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.project.images.push('data:image/jpg;base64,' + data);
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
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
      this.project.images[0] = imageData;
      this.hasPicture = true;
      //this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getSize() {
    return '100px 100px'
  }

  getProfileImageStyle() {
    //return 'url(' + this.form.controls['profilePic'].value + ')'
    return 'url(' + this.project.images[this.project.images.length-1] + ')'
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
    return this.project;
  }

}
