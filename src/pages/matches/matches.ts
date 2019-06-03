import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, NavParams } from 'ionic-angular';
import { Firestore } from '../../providers/firestore/firestore';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  templateUrl: 'matches.html',
})

export class MatchesPage {

  /*matches = [{
    imageUrl: 'assets/img/marty-avatar.png',
    title: 'McFly',
    lastMessage: 'Hey, what happened yesterday?',
    timestamp: new Date()
  },
  {
    imageUrl: 'assets/img/ian-avatar.png',
    title: 'Venkman',
    lastMessage: 'Sup, dude',
    timestamp: new Date()
  }
  ,
  {
    imageUrl: 'assets/img/sarah-avatar.png.jpeg',
    title: 'Sarah Mcconnor',
    lastMessage: 'You still ow me that pizza.',
    timestamp: new Date()
  }];*/

  public matchesKeys;
  public matches;

  constructor(public navCtrl: NavController, private firestore: Firestore, public navParams: NavParams, public appCom: MyApp, private menuCtrl: MenuController) {
    //console.log(this.navParams);
    let id = this.navParams.get('projectProfile').id;
    console.log(id);
    this.firestore.getMatchesFromProfile(id).valueChanges().subscribe( matches => {
      this.matchesKeys = Object.keys(matches.matched);
      this.matches = matches.matched;
      console.log(this.matchesKeys);
      console.log(this.matches);
    });
  }

  viewMessages(chat) {
    this.navCtrl.push('ViewProfilePage', { chatId: chat.id });
  }

  openMenu() {
    //have a variable that checks if edit was tapped; if was then would want to undo and reset colors
    if(!this.menuCtrl.isOpen() && this.appCom.isEdit()) {
      this.appCom.toggleProfileSettings();
    }
    this.menuCtrl.open();
  }
}
