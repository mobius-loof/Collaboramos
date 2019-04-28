import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, public platform: Platform) {
    this.dir = platform.dir();
    this.slides = [
      {
        title: 'Welcome to the Ionic Super Starter',
        description: 'The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: 'How to use the Super Starter',
        description: "Assemble the various page types you want and remove the ones you don't. We've provided many common mobile app page layouts, like login and signup pages, tabs, and this tutorial page.",
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: 'Getting Started',
        description: 'Need help? Check out the Super Starter README for a full tutorial',
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
