import { Component, ViewChild, ViewChildren, QueryList, Renderer} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  skillsExpanded = false;
  websiteExpanded = false;
  resumeExpanded = false;


  @ViewChild("skills") skillContent: any;
  @ViewChild("website") websiteContent: any;
  @ViewChild("resume") resumeContent: any;

  private element;


  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, private http: Http, public renderer: Renderer) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{email: ''}];
    this.addNewCards(1);
  }

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

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    this.element = element;
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

  }

  // Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.email;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.email;
    }

  }

  // Add new cards to our array
  addNewCards(count: number) {
    this.http.get('https://randomuser.me/api/?results=' + count)
    .map(data => data.json().results)
    .subscribe(result => {
      for (let val of result) {
        this.cards.push(val);
      }
    })

  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;

  }

}
