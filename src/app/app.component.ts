import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, MenuController, AlertController, Events } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';

import { Firestore } from '../providers/firestore/firestore';
import { Project } from '../models';
import { Subscription } from 'rxjs';
//import { CreateProjectPage } from '../pages/create-project/create-project';

// SET SIDEBAR STATE TO WAIT FOR ACCOUNT
  // account only exists after login

// Oberservable and Listener to get the is_visible boolean from Firestore
  // listen for changes from Firestore; get tutorial from Thomas

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  //title pages and where to send the navCtrl to; some are placeholders
  pages: any[] = [
    {title: 'Create Project', component: 'CreateProjectPage'},
    {title: 'Create Candidate', component: 'CreateCandidatePage'},
    {title: 'Account Settings', component: 'SettingsPage'},
    {title: 'Logout', component: 'WelcomePage'},

    {title: 'ProfileProject', component: 'ProfileProjectPage'},
    {title: 'ProfileCandidate', component: 'ProfileCandidatePage'},
    { title: 'HomeProject', component: 'HomeProjectPage' },
    { title: 'HomeCandidate', component: 'HomeCandidatePage' },
  ]

  private PROJECT = 'project';
  private CANDIDATE = 'candidate';

  //boolean value for ion-toggle to set
  private isToggled: boolean;

  //variables related to project profile
  private projectCreated: boolean;
  private projectVis: boolean;
  private projectColor: string = 'nop';

  //variables related to candidate profile
  private candidateCreated: boolean;
  private candidateVis: boolean;
  private candidateColor: string = 'nop';

  //boolean value to check if ion-toggle is set
  private checked: boolean;

  //variables related to edit button status
  private editButton: string = 'Edit';
  private editMode: boolean = false;

  //variable to tell what was last profile
  private lastProf: string;

  private PROJECT_COLOR: string = 'project_button';
  private CANDIDATE_COLOR: string = 'candy_button';
  //private projProf: Project;

  constructor(private platform: Platform,
              settings: Settings,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              private firestore: Firestore,
              private event: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.projectVis = projectPage.getProject().is_visible;
    });
  }

  public notify(check: boolean) {
    //need to interface with Firebase for this to remember last toggled setting
    if(this.lastProf === this.PROJECT) {
      this.isToggled = this.projectVis;
    } else if(this.lastProf === this.CANDIDATE) {
      this.isToggled = false;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  closeMenu() {
    //closes the left side menu
    this.menuCtrl.close();

    if(this.editMode) {
      this.toggleProfileSettings();
    }
  }

  openMenu() {
    //open the menu
    this.menuCtrl.open();
  }

  /*
   * Setter for the edit button name
   */
  setEdit(editName: string) {
    this.editButton = editName;
  }

  isEdit() {
    //return the status of the editMode
    return this.editMode;
  }

  toggleProfileSettings() {
    //change the editMode boolean, meaning pressed button
    this.editMode = !this.editMode;

    //if in edit mode, then change the profile tabs to red indicating delete
    if(this.editMode) {
      this.projectColor = 'danger';
      this.candidateColor = 'danger';

      this.editButton = 'Cancel';

    //otherwise if hit cancel, then set the profile to last one used
    } else if(!this.editMode) {
      this.editButton = 'Edit';

      if(this.lastProf === 'project') {
        this.projectColor = this.PROJECT_COLOR;

        if(this.candidateCreated) {
          this.candidateColor = 'baby_powder';
        } else {
          this.candidateColor = 'nop';
        }
      } else if(this.lastProf === 'candidate') {
        this.candidateColor = this.CANDIDATE_COLOR;

        if(this.projectCreated) {
          this.projectColor = 'baby_powder';
        } else {
          this.projectColor = 'nop';
        }

      //if profiles have not been created yet, set to grey color indicating need to create
      } else {
        this.projectColor = 'nop';
        this.candidateColor = 'nop';
      }
    }
  }

  makeProfile(profileType) {
    //if project button tapped, then create/delete settings
    if(profileType === this.PROJECT) {
      this.projectCreate();
      this.projectSettings();

      if(this.editMode && this.projectCreated) {
        this.promptDelete(this.PROJECT);
      }

    //if candidate button tapped, then create/delete settings
    } else if(profileType === this.CANDIDATE) {
      this.candidateCreate();
      this.candidateSettings();

      if(this.editMode && this.candidateCreated) {
        this.promptDelete(this.CANDIDATE);
      }
    }
  }

  changePage(item) {
    //change page and close menu for certain menu actions
    this.nav.setRoot(item.component);
    this.closeMenu();
  }

  projectCreate() {
    if(!this.projectCreated && !this.editMode) {
      this.nav.setRoot('CreateProjectPage');
      this.projectCreated = true;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.pages[0].title = 'Collaboramos';
      this.closeMenu();
    }
  }

  candidateCreate() {
    if(!this.candidateCreated && !this.editMode) {
      this.nav.setRoot('CreateCandidatePage');
      this.candidateCreated = true;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.pages[1].title = 'Gary G.';
      this.closeMenu();
    }
  }

  projectSettings() {
    //set the defaults for the project profile once it is created
    if(!this.editMode) {
      this.lastProf = 'project';
      this.projectColor = this.PROJECT_COLOR;
      this.checked = false;
      //this.projectVis = true;
      this.firestore.getProjectProfileReference('GHhA9rhXgDisR0qm0IEh').valueChanges().subscribe(myData => {
        console.log("FK " + myData.description);
        this.projectVis = myData.is_visible;
      });

      var projProf: Project;

      this.event.publish('lastProf', 'project');

      if(this.candidateColor !== 'nop') {
        this.candidateColor = 'baby_powder';
      }
    }
  }

  candidateSettings() {
    //set defaults for candidate profile once it has been created
    if(!this.editMode) {
      this.lastProf = 'candidate';
      this.candidateColor = this.CANDIDATE_COLOR;
      this.checked = false;
      //this.candidateVis = true;

      this.event.publish('lastProf', 'candidate');

      if(this.projectColor !== 'nop') {
        this.projectColor = 'baby_powder';
      }
    }
  }

  profileDelete(profileType) {
    //if tap delete on prompt for project profile, then delete
    if(profileType === this.PROJECT) {
      this.projectCreated = false;
      this.pages[0].title = 'Create Project';
      //this.projectVis = false;

      if(this.candidateCreated) {
        this.lastProf = 'candidate';
      } else {
        this.lastProf = '';
      }

    //if tap delete on prompt for candidate profile, then delete
    } else if(profileType === this.CANDIDATE) {
      this.candidateCreated = false;
      this.pages[1].title = 'Create Candidate';
      //this.candidateVis = false;

      if(this.projectCreated) {
        this.lastProf = 'project';
      } else {
        this.lastProf = '';
      }
    }
  }

  promptDelete(profileType) {
    //bring up a prompt to delete profile
    let alert = this.alertCtrl.create({
      title: 'Delete Profile',
      message: 'Do you want to delete this profile?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.profileDelete(profileType);
          }
        }
      ]
    });
    alert.present();
  }
}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase