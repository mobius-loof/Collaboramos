import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { }


  viewMessages() {
    this.navCtrl.push('MessagePage');
  }

}
