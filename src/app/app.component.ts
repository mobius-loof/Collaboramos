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
    {title: 'ViewCandidateProfile', component: 'ViewCandidateProfilePage'},
    {title: 'ViewProjectProfile', component: 'ViewProjectProfilePage'},
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
  protected isToggled: boolean;

  //variables related to project profile
  private projectInvis: boolean;
  private projectColor: string = this.PROJECT_COLOR;

  //variables related to candidate profile
  private candidateInvis: boolean;
  private candidateColor: string = this.CANDIDATE_COLOR;

  private isEdit: boolean = false;

  //variable to tell what was last profile
  private currentProfile: string;

  private project: Project;
  private candidate: Candidate;
  private account: Account;
  private projectRef: DocumentReference;
  private candidateRef: DocumentReference;

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

  // this should handle input from ion-toggles
  public notify(check: boolean) {
    //need to interface with Firebase for this to remember last toggled setting
    // this.isToggled = !check;

    // if(this.currentProfile === this.PROJECT) {

    //   if(this.projToggled) {
    //     this.project = this.switchProjectVisibleModel(this.project, false);

    //     this.firestore.updateProjectProfile(this.project);
    //   } else if(!this.projToggled) {

    //     this.project = this.switchProjectVisibleModel(this.project, true);

    //     this.firestore.updateProjectProfile(this.project);
    //   }
    //   //this.projectSettings();
    // } else if(this.currentProfile === this.CANDIDATE) {
    //   this.isToggled = false;
    // }
  }

  closeMenu() {
    //closes the left side menu
    this.menuCtrl.close();
    this.isEdit = false;
  }

  changePage(item) {
    //change page and close menu for certain menu actions
    this.nav.setRoot(item.component);
    this.closeMenu();
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
            // this.profileDelete(profileType);
          }
        }
      ]
    });
    alert.present();
  }

  reset() {
    if(!this.project && !this.candidate) {
      this.isEdit = false;

      // NAVPARAMS?
      this.nav.setRoot('CreateProfilePage');
      this.closeMenu();
    }
  }

  setEdit(edit: boolean) {
    this.isEdit = edit;
  }

  setAccount(acc: Account) {
    this.account = acc;
  }

  setCandidateProfile(candidate: Candidate) {
    this.candidate = candidate;
  }

  setProjectProfile(proj: Project) {
    this.project= proj;
  }

  setCandidateProfileRef(ref: DocumentReference) {
    this.projectRef = ref;
  }

  setProjectProfileRef(ref: DocumentReference) {
    this.candidateRef = ref;
  }

  setCurrentProfile(profile: string) {
    this.currentProfile = profile;

    if(profile === 'project') {
      this.projectColor = "project_banner";
      this.candidateColor = "nop";
      this.projectPublishEvents();
    } else if(profile === 'candidate') {
      this.projectColor = "nop";
      this.candidateColor = "candy_banner";
      this.candidatePublishEvents();
    }
  }

  candidatePublishEvents() {
    this.events.publish('currentProfile', 'candidate');
  }

  projectPublishEvents() {
    this.events.publish('currentProfile', 'project');
  }

}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase