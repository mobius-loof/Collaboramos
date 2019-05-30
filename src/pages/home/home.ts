import { Component, ViewChild, ViewChildren, QueryList, Renderer} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import 'rxjs/Rx';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mode = "candidate";
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, private http: Http, public renderer: Renderer, public appCom: MyApp, private menuCtrl: MenuController) {
    this.menuCtrl.swipeEnable(false);   
  };

  viewMessages() {
    this.navCtrl.push('MessagePage');
  }

  /**
   * Test function for dynamic display
   */
  switchMode() {
    this.mode = this.mode==="candidate" ? "project" : "candidate";
    console.log(this.mode)
  }

  openMenu() {
    if(!this.menuCtrl.isOpen() && this.appCom.isEdit()) {
      this.appCom.toggleProfileSettings();
    }
    this.menuCtrl.open();
  }

}
