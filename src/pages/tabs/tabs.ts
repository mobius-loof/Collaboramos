import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = 'Items';
  tab2Title = 'Home';
  tab3Title = 'Matches';

  params: any

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {
    console.log(navParams);
    this.params = navParams;
  }
}
