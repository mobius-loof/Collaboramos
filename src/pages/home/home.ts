import { Component, ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
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
    SwingCardComponent
} from 'angular2-swing';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    mode = "project";
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public items: Items,
        private http: Http,
        public renderer: Renderer,
        public appCom: MyApp,
        private menuCtrl: MenuController,
        private events: Events) {
        this.menuCtrl.swipeEnable(false);

        events.subscribe('lastProf', project => {
            this.mode = project;
        })
    };

    viewMessages() {
        this.navCtrl.push('MessagePage');
    }

    openMenu() {
        this.menuCtrl.open();
    }

}
