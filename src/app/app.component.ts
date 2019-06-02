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
  //private checked: boolean;

  //variables related to edit button status
  private editButton: string = 'Edit';
  private editMode: boolean = false;

  //variable to tell what was last profile
  private lastProf: string;

  private PROJECT_COLOR: string = 'project_button';
  private CANDIDATE_COLOR: string = 'candy_button';
  private projProf: Project;
  private candProf: Candidate;
  private account: Account;
  private projRef: DocumentReference;
  private candRef: DocumentReference;

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
    //console.log("Toggle: " + this.isToggled);

    if(this.lastProf === this.PROJECT) {
      console.log(this.projProf.description);

      if(this.projectVis) {
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
      } else {
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

      /*var proj_ref = this.firestore.getAccount(this.account.id).then(myData => {
        return myData.project_ref;
      });*/

      //console.log(this.projProf.description);

    //if candidate button tapped, then create/delete settings
    } else if(profileType === this.CANDIDATE) {
      this.candidateCreate();
      this.candidateSettings();

      if(this.editMode && this.candidateCreated) {
        this.promptDelete(this.CANDIDATE);
      }

      /*this.candProf = this.firestore.getAccount(this.account.id).then(myData => {
        return myData.candidate_ref;
      });*/
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

      this.projectCreated = true;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.pages[0].title = 'Collaboramos';

      /*this.tempVar = this.firestore.getProjectProfileReference('VpomGCkP4vpZ3HYNoEta').valueChanges();
      this.tempVar.subscribe(myData => {
        this.projProf = myData;
      });*/

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

      this.candidateCreated = true;

      //CHANGE THE NAME BASED ON FIRESTORE
      this.pages[1].title = 'Gary G.';
      this.closeMenu();
    }
  }
  public tempVar;

  projectSettings() {
    //set the defaults for the project profile once it is created
    if(!this.editMode) {
      this.lastProf = 'project';
      this.projectColor = this.PROJECT_COLOR;
      //this.checked = false;
      this.projectVis = true;

      if(this.candidateColor !== 'nop') {
        this.candidateColor = 'baby_powder';
      }

      this.projectPublishEvents();
    }
  }

  projectPublishEvents() {
    this.events.publish('lastProf', 'project');
    this.events.publish('project', this.projProf);
  }

  candidateSettings() {
    //set defaults for candidate profile once it has been created
    if(!this.editMode) {
      this.lastProf = 'candidate';
      this.candidateColor = this.CANDIDATE_COLOR;
      //this.checked = false;
      this.candidateVis = true;

      this.events.publish('lastProf', 'candidate');

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
}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase