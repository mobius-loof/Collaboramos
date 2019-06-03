import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Tab1RootP, Tab1RootC, Tab2RootP, Tab2RootC, Tab3Root } from '../';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1RootP;
  tab2Root: any = Tab2RootP;
  tab3Root: any = Tab3Root;

  tab1Title = 'Profile';
  tab2Title = 'Home';
  tab3Title = 'Matches';

  params: any

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public events: Events) {

    console.log(navParams);
    this.params = navParams;

    console.log(this.params.get("currentProfile"));

    if (this.params.get("currentProfile") == "candidate") {
      console.log("Reached Candidate setting!");
      this.tab1Root = Tab1RootC;
      this.tab2Root = Tab2RootC;
    }
    else if (this.params.get("currentProfile") == "project") {
      console.log("Reached Project setting!");
      this.tab1Root = Tab1RootP;
      this.tab2Root = Tab2RootP;
    }
    else {
      this.navCtrl.setRoot("CreateProfilePage", this.params);
    }

    events.subscribe('currentProfile', (s) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('receive broadcast current profile' + s);
      if (s === "candidate") {
        console.log('current profile: Candidate');
        this.tab1Root = Tab1RootC;
        this.tab2Root = Tab2RootC;
        this.params["data"]["currentProfile"] = "candidate";
      }
      else if (s === "project") {
        console.log('current profile: Project');
        this.tab1Root = Tab1RootP;
        this.tab2Root = Tab2RootP;
        this.params["data"]["currentProfile"] = "project";
      }
      // setRoot
      else {
        this.params["data"]["currentProfile"] = "";
        this.navCtrl.setRoot("CreateProfilePage", this.params);
        return;
      }
      console.log(this.tab1Root);
      console.log(this.params);
      this.navCtrl.setRoot("TabsPage", this.params);
    });
  }

}
