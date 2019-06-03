import { Component, ViewChild, ViewChildren, QueryList, Renderer} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
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
  selector: 'page-home-project',
  templateUrl: 'home-project.html'
})
export class HomeProjectPage {
  params;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, private http: Http, public renderer: Renderer, public menuCtrl: MenuController) {
    this.params = navParams;
    };

    viewMessages() {
      this.navCtrl.push("ChatsPage", this.params['data'])
    }

    openMenu() {
      this.menuCtrl.open();
    }
}
