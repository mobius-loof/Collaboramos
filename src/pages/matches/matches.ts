import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, NavParams } from 'ionic-angular';
import { Firestore } from '../../providers/firestore/firestore';
import { MyApp } from '../../app/app.component';
import { NAMESPACE_URIS } from '@angular/platform-browser/src/dom/dom_renderer';

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

  public matchesKeys: any[];
  public matches;
  public profileId;
  public names = new Map();

  constructor(public navCtrl: NavController, private firestore: Firestore, public navParams: NavParams, public appCom: MyApp, private menuCtrl: MenuController) {
    //console.log(this.navParams);
    if(this.navParams.get('currentProfile') == "project"){
      this.profileId = this.navParams.get('projectProfile').id;
    }else{
      this.profileId = this.navParams.get('candidateProfile').id;
    }
    //console.log(id);
    this.firestore.getMatchesFromProfile(this.profileId).valueChanges().subscribe( matches => {
      this.matchesKeys = Object.keys(matches.matched);
      this.matches = matches.matched;

      if(this.navParams.get('currentProfile') == "project"){
        this.matchesKeys.forEach(element => {
          this.firestore.getCandidateProfileFromID(element).then(candidate =>
            {this.names.set(element, candidate.name)});
        });  
      }else{
        this.matchesKeys.forEach(element => {
          this.firestore.getProjectProfileFromID(element).then(project =>
            {this.names.set(element, project.name)});
        });
      }
      //console.log(this.matchesKeys);
      //console.log(this.matches);
      console.log(this.names);
    });
    
    //get names
    /*var i;
    if(this.navParams.get('currentProfile') == "project"){
      for(i = 0; i < this.matchesKeys.length; i++){
        this.firestore.getCandidateProfileFromID(this.matchesKeys[i]).then(candidate =>
          {this.names.set(this.matchesKeys[i],candidate.name)});
      }
    }else{
      for(i = 0; i < this.matchesKeys.length; i++){
        this.firestore.getProjectProfileFromID(this.matchesKeys[i]).then(project =>
          {this.names.set(this.matchesKeys[i], project.name)});
      }
    }*/

  }

  viewProfile(key) {
    //need to know which function to call (get Project from ID or get Candidate from ID)
    if(this.navParams.get('currentProfile') == "project"){
      this.firestore.getCandidateProfileFromID(key).then(candidate => {
        this.navCtrl.push('ViewCandidateProfilePage', {'candidateProfile': candidate});
      });
    }else{
      this.firestore.getProjectProfileFromID(key).then(project => {
        this.navCtrl.push('ViewProjectProfilePage', {'projectProfile': project});
      });
    }
    //this.navCtrl.push('ViewProfilePage', { chatId: chat.id });
  }

  openMenu() {
    //have a variable that checks if edit was tapped; if was then would want to undo and reset colors
    this.menuCtrl.open();
  }
}
