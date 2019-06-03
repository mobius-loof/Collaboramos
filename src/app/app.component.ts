import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, MenuController, AlertController, Events } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';

import { Firestore } from '../providers/firestore/firestore';
import { Project, Candidate } from '../models';
import { Subscription } from 'rxjs';
import { DocumentReference } from 'angularfire2/firestore';
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
    {title: 'Chats', component: 'ChatsPage'},
    {title: 'Messages', component: 'MessagesPage'},
    {title: 'Matches', component: 'MatchesPage'},
    {title: 'ViewProfile', component: 'ViewProfilePage'},
    { title: 'HomeProject', component: 'HomeProjectPage' },
    { title: 'HomeCandidate', component: 'HomeCandidatePage' },
  ]

  private PROJECT = 'project';
  private CANDIDATE = 'candidate';
  private PROJECT_COLOR: string = 'project_button';
  private CANDIDATE_COLOR: string = 'candy_button';
  private SWITCH: string = 'switch';

  private NON_COLOR: string = 'baby_powder';
  private NON_CREATE: string = 'nop';

  //boolean value for ion-toggle to set
  private isToggled: boolean;

  //variables related to project profile
  private projectCreated: boolean;
  private projectInvis: boolean;
  private projectColor: string = this.PROJECT_COLOR;

  //variables related to candidate profile
  private candidateCreated: boolean;
  private candidateInvis: boolean;
  private candidateColor: string = this.CANDIDATE_COLOR;

  //boolean value to check if ion-toggle is set
  //private checked: boolean;

  //variables related to edit button status
  private editButton: string = 'Edit';
  private editMode: boolean = false;

  //variable to tell what was last profile
  private currentProfile: string;

  private project: Project;
  private candidate: Candidate;
  private account: Account;
  private projectRef: DocumentReference;
  private candidateRef: DocumentReference;

  private projToggled: boolean;
  private candToggled: boolean;

  constructor(private platform: Platform,
              settings: Settings,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              private firestore: Firestore,
              private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuCtrl.swipeEnable(false);
    });
  }

  public notify(check: boolean) {
    //need to interface with Firebase for this to remember last toggled setting
    //this.checked = !check;
    this.isToggled = !check;

    if(this.currentProfile === this.PROJECT) {

      if(this.projToggled) {
        this.project = this.switchProjectVisibleModel(this.project, false);

        this.firestore.updateProjectProfile(this.project);
      } else if(!this.projToggled) {

        this.project = this.switchProjectVisibleModel(this.project, true);

        this.firestore.updateProjectProfile(this.project);
      }
      //this.projectSettings();
    } else if(this.currentProfile === this.CANDIDATE) {
      this.isToggled = false;
    }
  }

  /*openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }*/

  closeMenu() {
    //closes the left side menu
    this.menuCtrl.close();

    if(this.editMode) {
      this.toggleProfileSettings();
    }
  }

  /*openMenu() {
    //open the menu
    this.menuCtrl.open();
  }*/

  toggleEditSettings() {
    this.editMode = !this.editMode;
    this.toggleProfileSettings();
  }

  toggleProfileSettings() {
    //change the editMode boolean, meaning pressed button

    //if in edit mode, then change the profile tabs to red indicating delete
    if(this.editMode) {
      this.projectColor = 'danger';
      this.candidateColor = 'danger';

      this.editButton = 'Cancel';

    //otherwise if hit cancel, then set the profile to last one used
    } else if(!this.editMode) {
      this.editButton = 'Edit';

      if(this.projectCreated && !this.candidateCreated) {
        this.currentProfile = this.PROJECT;
      } else if(!this.projectCreated && this.candidateCreated) {
        this.currentProfile = this.CANDIDATE;
      }

      if(this.currentProfile === this.PROJECT) {
        this.projectColor = this.PROJECT_COLOR;

        if(this.candidateCreated) {
          this.candidateColor = this.NON_COLOR;
        }
      } else if(this.currentProfile === this.CANDIDATE) {
        this.candidateColor = this.CANDIDATE_COLOR;

        if(this.projectCreated) {
          this.projectColor = this.NON_COLOR;
        }

      }

    }
  }

  clickedProfile(profileType) {
    //if project button tapped, then create/delete settings
    if(profileType === this.PROJECT) {
      this.projectSettings();

      if(this.editMode && this.projectCreated) {
        this.promptDelete(this.PROJECT);
      }

    //if candidate button tapped, then create/delete settings
    } else if(profileType === this.CANDIDATE) {
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

      this.nav.push('CreateProjectPage', {
        account: this.account //,
      });

      this.projectCreated = true;
      this.projectInvis = false;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.projectColor = this.PROJECT_COLOR;
      this.currentProfile = this.PROJECT;

      if(this.candidateCreated) {
        this.candidateColor = this.NON_COLOR;
      }

      this.closeMenu();
    }
  }

  candidateCreate() {
    if(!this.candidateCreated && !this.editMode) {
      this.nav.push('CreateCandidatePage', {
        account: this.account //,
      });
      /*this.nav.setRoot('CreateCandidatePage', {
        account: this.account,
        candidateProfile: this.candidate,
        projectProfile: this.candidate,
        candidateProfileRef: null,
        projectProfileRef: null
      });

      this.candidate = {
        id: '32kul1tAw9FJRUC98hhg',
        name: 'Gary Bary',
        image: '',
        website: 'google',
        resume_URL: '',
        is_visible: true,
        skills: [],
        description: '',
        chats: {},
        interests: {},
        matches: {},
        waitlist: [],
        phone_number: '',
        email: '',
        address: ''
      };*/

      this.candidateCreated = true;
      this.candidateInvis = false;

      this.candidateColor = this.CANDIDATE_COLOR;
      this.currentProfile = this.CANDIDATE;

      //CHANGE THE NAME BASED ON FIRESTORE

      if(this.projectCreated) {
        this.projectColor = this.NON_COLOR;
      }
      this.closeMenu();
    }
  }

  projectSettings() {
    //set the defaults for the project profile once it is created
    if(!this.editMode) {
      this.currentProfile = 'project';
      this.projectColor = this.PROJECT_COLOR;

      if(this.candidateCreated) {
        this.candidateColor = this.NON_COLOR;
      }

      this.projectPublishEvents();
    }
  }

  candidateSettings() {
    //set defaults for candidate profile once it has been created
    if(!this.editMode) {
      this.currentProfile = 'candidate';
      this.candidateColor = this.CANDIDATE_COLOR;

      if(this.projectCreated) {
        this.projectColor = this.NON_COLOR;
      }

      this.candidatePublishEvents();
    }
  }

  profileDelete(profileType) {
    //if tap delete on prompt for project profile, then delete
    if(profileType === this.PROJECT) {
      this.projectCreated = false;
      this.projectInvis = false;

      if(this.candidateCreated) {
        this.currentProfile = 'candidate';
      } else {
        this.currentProfile = '';
      }

    //if tap delete on prompt for candidate profile, then delete
    } else if(profileType === this.CANDIDATE) {
      this.candidateCreated = false;
      this.candidateInvis = false;

      if(this.projectCreated) {
        this.currentProfile = 'project';
      } else {
        this.currentProfile = '';
      }
    }

    this.reset();
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

  reset() {
    if(!this.projectCreated && !this.candidateCreated) {
      this.editMode = false;
      this.editButton = 'Edit';

      // NAVPARAMS?
      this.nav.setRoot('CreateProfilePage');
      this.closeMenu();
    }
  }

  setEdit(editName: string) {
    this.editButton = editName;
  }

  setAccount(acc: Account) {
    this.account = acc;
  }

  setCandidateProfile(candy: Candidate) {
    this.candidate = candy;
    if (candy == null) {
      this.candidateCreated = false;
    } else {
      this.candidateCreated = true;
    }
  }

  setProjectProfile(proj: Project) {
    this.project= proj;
    if (proj == null) {
      this.projectCreated = false;
    } else {
      this.projectCreated = true;
    }
  }

  setCandidateProfileRef(ref: DocumentReference) {
    this.projectRef = ref;
  }

  setProjectProfileRef(ref: DocumentReference) {
    this.candidateRef = ref;
  }

  isEdit() {
    //return the status of the editMode
    return this.editMode;
  }

  setCurrentProfile(prof: string) {
    this.currentProfile = prof;

    if(prof === this.PROJECT) {
      this.projectPublishEvents();
    } else if(prof === this.CANDIDATE) {
      this.candidatePublishEvents();
    }
  }

  candidatePublishEvents() {
    this.events.publish('currentProfile', 'candidate');
  }

  projectPublishEvents() {
    this.events.publish('currentProfile', 'project');
  }

  switchProjectVisibleModel(model: Project, vis: boolean) {
    return {
      id: model.id,
      name: model.name,
      image: model.image,
      description: model.description,
      is_visible: vis,
      frameworks: model.frameworks,
      skills: model.skills,
      chats: model.chats,
      interests: model.interests,
      matches: model.matches,
      waitlist: model.waitlist,
      address: model.address,
      email: model.email,
      website: model.website,
      phone_number: model.phone_number
    };
  }

}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase