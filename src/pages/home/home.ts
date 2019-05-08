import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  skillsExpanded = false;
  websiteExpanded = false;
  resumeExpanded = false;

  @ViewChild("skills") skillContent: any;
  @ViewChild("website") websiteContent: any;
  @ViewChild("resume") resumeContent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public renderer: Renderer) { }


  viewMessages() {
    this.navCtrl.push('MessagePage');
  }

  toggleSkills(){
    if(this.skillsExpanded){
      this.renderer.setElementStyle(this.skillContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.skillContent.nativeElement, "padding", "0px 16px");
    }
    else {
      this.renderer.setElementStyle(this.skillContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.skillContent.nativeElement, "padding", "13px 16px");
    }

    this.skillsExpanded = !this.skillsExpanded;

  }

  toggleWebsite(){
    if(this.websiteExpanded){
      this.renderer.setElementStyle(this.websiteContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.websiteContent.nativeElement, "padding", "0px 16px");
    }
    else {
      this.renderer.setElementStyle(this.websiteContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.websiteContent.nativeElement, "padding", "13px 16px");
    }

    this.websiteExpanded = !this.websiteExpanded;

  }

  toggleResume(){
    if(this.resumeExpanded){
      this.renderer.setElementStyle(this.resumeContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.resumeContent.nativeElement, "padding", "0px 16px");
    }
    else {
      this.renderer.setElementStyle(this.resumeContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.resumeContent.nativeElement, "padding", "13px 16px");
    }

    this.resumeExpanded = !this.resumeExpanded;
  }

}
