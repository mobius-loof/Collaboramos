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

  private NON_COLOR: string = 'baby_powder';
  private NON_CREATE: string = 'nop';

  //boolean value for ion-toggle to set
  private isToggled: boolean;

  //variables related to project profile
  private projectCreated: boolean;
  private projectVis: boolean;
  private projectColor: string = this.PROJECT_COLOR;

  //variables related to candidate profile
  private candidateCreated: boolean;
  private candidateVis: boolean;
  private candidateColor: string = this.CANDIDATE_COLOR;

  //boolean value to check if ion-toggle is set
  //private checked: boolean;

  //variables related to edit button status
  private editButton: string = 'Edit';
  private editMode: boolean = false;

  //variable to tell what was last profile
  private lastProf: string;

  private projProf: Project;
  private candProf: Candidate;
  private account: Account;
  private projRef: DocumentReference;
  private candRef: DocumentReference;

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
    });
  }

  public notify(check: boolean) {
    //need to interface with Firebase for this to remember last toggled setting
    //this.checked = !check;
    this.isToggled = !check;

    if(this.lastProf === this.PROJECT) {

      if(this.projToggled) {
        var dumProfile: Project;
        dumProfile = {
          id: 'VpomGCkP4vpZ3HYNoEta',
          name: 'Henlo',
          image: 'Henlo',
          description: 'THANOS',
          is_visible: true,
          frameworks: null,
          skills: null,
          chats: {},
          interests: {},
          matches: {},
          waitlist: null,
          address: '123 Gamer',
          email: 'henlo@henlo.com',
          website: 'Google',
          phone_number: '12'
        };

        this.firestore.updateProjectProfile(dumProfile);
      } else if(!this.projToggled) {
        var dumProfile: Project;
        dumProfile = {
          id: 'VpomGCkP4vpZ3HYNoEta',
          name: 'Henlo',
          image: 'Henlo',
          description: 'THANOS',
          is_visible: false,
          frameworks: null,
          skills: null,
          chats: {},
          interests: {},
          matches: {},
          waitlist: null,
          address: '123 Gamer',
          email: 'henlo@henlo.com',
          website: 'Google',
          phone_number: '12'
        };

        this.firestore.updateProjectProfile(dumProfile);
      }
      //this.projectSettings();
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

      if(this.lastProf === this.PROJECT) {
        this.projectColor = this.PROJECT_COLOR;

        if(this.candidateCreated) {
          this.candidateColor = this.NON_COLOR;
        }
      } else if(this.lastProf === this.CANDIDATE) {
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

      this.nav.setRoot('CreateProjectPage', {
        account: this.account,
        candidateProfile: this.candProf,
        projectProfile: this.candProf,
        candidateProfileRef: null,
        projectProfileRef: null
      });

      this.projProf = {
        id: 'VpomGCkP4vpZ3HYNoEta',
        name: 'Vamos',
        image: 'Henlo',
        description: 'THANOS',
        is_visible: true,
        frameworks: null,
        skills: null,
        chats: {},
        interests: {},
        matches: {},
        waitlist: null,
        address: '123 Gamer',
        email: 'henlo@henlo.com',
        website: 'Google',
        phone_number: '12'
      };

      this.projectCreated = true;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.projectColor = this.PROJECT_COLOR;
      this.lastProf = this.PROJECT;

      if(this.candidateCreated) {
        this.candidateColor = this.NON_COLOR;
      }

      this.closeMenu();
    }
  }

  candidateCreate() {
    if(!this.candidateCreated && !this.editMode) {
      this.nav.setRoot('CreateCandidatePage', {
        account: this.account,
        candidateProfile: this.candProf,
        projectProfile: this.candProf,
        candidateProfileRef: null,
        projectProfileRef: null
      });

      this.candProf = {
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
      };

      this.candidateCreated = true;
      this.candidateColor = this.CANDIDATE_COLOR;
      this.lastProf = this.CANDIDATE;

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
      this.lastProf = 'project';
      this.projectColor = this.PROJECT_COLOR;

      if(this.candidateCreated) {
        this.candidateColor = this.NON_COLOR;
      }

      this.projectPublishEvents();
    }
  }

  projectPublishEvents() {
    this.events.publish('lastProf', 'project');
  }

  candidateSettings() {
    //set defaults for candidate profile once it has been created
    if(!this.editMode) {
      this.lastProf = 'candidate';
      this.candidateColor = this.CANDIDATE_COLOR;

      this.events.publish('lastProf', 'candidate');

      if(this.projectCreated) {
        this.projectColor = this.NON_COLOR;
      }

      this.candidatePublishEvents();
    }
  }

  candidatePublishEvents() {
    this.events.publish('lastProf', 'candidate');
  }

  profileDelete(profileType) {
    //if tap delete on prompt for project profile, then delete
    if(profileType === this.PROJECT) {
      this.projectCreated = false;
      this.projectVis = false;

      if(this.candidateCreated) {
        this.lastProf = 'candidate';
      } else {
        this.lastProf = '';
      }

    //if tap delete on prompt for candidate profile, then delete
    } else if(profileType === this.CANDIDATE) {
      this.candidateCreated = false;
      this.candidateVis = false;

      if(this.projectCreated) {
        this.lastProf = 'project';
      } else {
        this.lastProf = '';
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
    }
  }

  copyProjectProfile(profile: Project) {
    return {
      id: profile.id,
      name: profile.name,
      image: profile.image,
      description: profile.description,
      is_visible: profile.is_visible,
      frameworks: Object.assign([], profile.frameworks),
      skills: Object.assign([], profile.skills),
      chats: profile.chats,
      interests: profile.interests,
      matches: profile.matches,
      waitlist: Object.assign([], profile.waitlist),
      address: profile.address,
      email: profile.email,
      website: profile.website,
      phone_number: profile.phone_number
    };
  }

  getBoolean(project: Project) {
    this.projectVis = project.is_visible;
  }

  setAccount(acc: Account) {
    this.account = acc;
  }

  setCandidateProfile(candy: Candidate) {
    this.candProf = candy;
  }

  setProjectProfile(proj: Project) {
    this.projProf = proj;
  }

  setCandidateProfileRef(ref: DocumentReference) {
    this.projRef = ref;
  }

  setProjectProfileRef(ref: DocumentReference) {
    this.candRef = ref;
  }

  setCurrentProfile(prof: string) {
    this.lastProf = prof;

    if(prof === this.PROJECT) {
      this.projectPublishEvents();
    } else if(prof === this.CANDIDATE) {
      this.candidatePublishEvents();
    }
  }
}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase