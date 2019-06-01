import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Project } from '../../models/project';
import { Firestore } from '../../providers/firestore/firestore';
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

  project: Project = {
      id: null,
      proj_name: "",
      images:[],
      description: "",
      is_visible: true,
      skills: ["C++", "Java"],
      frameworks: ["Github","Bitbucket"],
      chats: {},
      interests: {},
      matches: {},
      waitlist: [],
      address: "",
      email: "",
      website: ""
    };

  @ViewChild('imageInput') imageInput;

  isReadyToSave: boolean;
  hasPicture: boolean;
  //form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertController: AlertController, public camera: Camera, private firestore: Firestore) {
    this.hasPicture = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProjectPage');
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
      this.project.images.push(imageData);
      this.hasPicture = true;
    };

    reader.readAsDataURL(event.target.files[event.target.files.length - 1]);
  }

  getSize() {
    return '180px 140px'
  }

  getProfileImageStyle() {
    return 'url(' + this.project.images[this.project.images.length-1] + ')'
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
    //this.firestore.createProjectProfile(this.project);
    this.navCtrl.setRoot("TabsPage")
    return this.project;
    }

    /**
     * 
     *Tag
    **/
    deleteTag(t: string, type:string) {
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
                    placeholder: 'Add a new ' + type.substring(0, type.length-1)
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
