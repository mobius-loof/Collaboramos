import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { FirstRunPage, Tab1Root, Tab2Root, Tab3Root } from '../pages';
import { Settings } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  //title pages and where to send the navCtrl to; some are placeholders
  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' },
    { title: 'CreateProject', component: 'CreateProjectPage' },
    { title: 'HomeProject', component: 'HomeProjectPage' },
    { title: 'HomeCandidate', component: 'HomeCandidatePage' },
    {title: 'Create Project', component: ''},
    {title: 'Create Candidate', component: ''},
    {title: 'Invisible', component: ''},
    {title: 'Account Settings', component: 'SettingsPage'},
    {title: 'Logout', component: 'WelcomePage'},
    {title: 'ProfileProject', component: 'ProfileProjectPage'},
    {title: 'ProfileCandidate', component: 'ProfileCandidatePage'},
    {title: 'Chats', component: 'ChatsPage'},
    {title: 'Messages', component: 'MessagesPage'},
    {title: 'Matches', component: 'MatchesPage'},
  ]

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

  constructor(platform: Platform, settings: Settings, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isToggled = false;
    });
  }

  public notify(check: boolean) {
    //need to interface with Firebase for this to remember last toggled setting
    console.log("Toggled: "+ this.isToggled);
    check = !check

    if(this.candidateCreated) {
      //check candidateVis
    } else if(this.projectCreated) {
      //check projectVis
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
    this.menuCtrl.open();
  }

  /*
   * Setter for the edit button name
   */
  setEdit(editName: string) {
    this.editButton = editName;
  }

  isEdit() {
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
        this.projectColor = 'project';

        if(this.candidateCreated) {
          this.candidateColor = 'baby_powder';
        } else {
          this.candidateColor = 'nop';
        }
      } else if(this.lastProf === 'candidate') {
        this.candidateColor = 'candidate';

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

  makeProfile(item) {
    //just placeholder for setting the navCtrl to move to different pages
    if(item.component == '') {
      console.log('Toggles Here');
    } else {
      this.nav.setRoot(item.component);
      this.closeMenu();
    }
  }

  createProject() {
    //set the defaults for the project profile once it is created
    if(!this.editMode) {
      this.lastProf = 'project';
      this.projectColor = 'project';
      this.checked = false;
      this.projectVis = true;
      this.projectCreated = true;
      this.pages[0].title = 'Collaboramos';

      if(this.candidateColor !== 'nop') {
        this.candidateColor = 'baby_powder';
      }
    }
  }

  createCandidate() {
    //set defaults for candidate profile once it has been created
    if(!this.editMode) {
      this.lastProf = 'candidate';
      this.candidateColor = 'candidate';
      this.checked = false;
      this.candidateVis = true;
      this.candidateCreated = true;
      this.pages[1].title = 'Gary G.';

      if(this.projectColor !== 'nop') {
        this.projectColor = 'baby_powder';
      }
    }
  }
}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page
//use firebase isVisible flag for toggle and profile visibility settings
//  learn firebase