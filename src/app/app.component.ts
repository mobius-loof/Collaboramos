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

  pages: any[] = [
    /*{ title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }*/
    {title: 'Toggle Project Here', component: ''},
    {title: 'Toggle Candidate Here', component: ''},
    {title: 'Toggle Invisible Here', component: ''},
    {title: 'Account Settings Here', component: 'SettingsPage'},
    {title: 'Logout Here', component: 'WelcomePage'},
    {title: 'Todo: Change Password screen, other', component: ''}
  ]

  public isToggled: boolean;

  constructor(platform: Platform, settings: Settings, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isToggled = false;
    });
  }

  public notify() {
    console.log("Toggled: "+ this.isToggled); 
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  makeProfile(item) {
    // if no profile, create button is present

    // once created, then will be a toggle to switch to either profile
    if(item.component == '') {
      console.log('Toggles Here');
    } else {
      this.nav.setRoot(item.component);
      this.closeMenu();
    }
  }
}

// can wrap things in ion item; put button and text

//ionic toggle for profile visibility and ionic modal for settings page