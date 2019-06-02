import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Firestore } from '../../providers/firestore/firestore';

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

  public chats

  constructor(public navCtrl: NavController, private firestore: Firestore) {
    this.chats = this.firestore.getChannelsFromProfile("L4wTy2ApbjJEzSavgXIL").valueChanges();
  }

  viewProfile(chat) {
    this.navCtrl.push('ViewProfile', { chatId: chat.id });
  }
}
