import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-home-candidate',
  templateUrl: 'home-candidate.html'
})
export class HomeCandidatePage {
params;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.params = navParams;
    };

    viewMessages() {
      this.navCtrl.push("ChatsPage", this.params['data'])
    }

    openMenu() {
      this.menuCtrl.open();
    }
}
