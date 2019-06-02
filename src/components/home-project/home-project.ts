import { Component, ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Http } from '@angular/http';
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

import { Items, Firestore } from '../../providers';
/**
 * Generated class for the HomeProjectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'home-project',
    templateUrl: 'home-project.html'
})
export class HomeProjectComponent {


    @ViewChild('myswing1') swingStack: SwingStackComponent;
    @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

    skillsExpanded = true;
    descExpanded = true;

    private element;


    cards: Array<any>;
    topCard;
    stackConfig: StackConfig;
    recentCard: string = '     ';

    tags = [];
    frameworks = ['f1', 'f2'];

    public account: Promise<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams, 
                public items: Items, 
                private http: Http, 
                public renderer: Renderer, 
                private firestore: Firestore,
                ) {
        this.stackConfig = {
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.min(Math.abs(offsetX) / (element.offsetWidth / 4), 1);
            },
            transform: (element, x, y, r) => {
                this.onItemMove(element, x, y, r);
            },
            throwOutDistance: (d) => {
                return 800;
            }
        };

        this.cards = [];
        this.addNewCards(3);

    }

    ngAfterViewInit() {
        // Either subscribe in controller or set in HTML
        this.swingStack.throwin.subscribe((event: DragEvent) => {
            event.target.style.background = '#ffffff';
        });

    }

    clickResume() {
        console.log("resume")
        
    }

    clickWebsite() {
        console.log("website")
    }

    // Called whenever we drag an element
    onItemMove(element, x, y, r) {
        var color = '';
        var abs = Math.abs(x);
        let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
        let hexCode = this.decimalToHex(min, 2);
        /*
            if (x < 0) {
              color = '#FF' + hexCode + hexCode;
            } else {
              color = '#' + hexCode + 'FF' + hexCode;
            }
        */
        this.element = element;
        element.style.background = color;
        element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

    }

    // Connected through HTML
    voteUp(like: boolean) {
        let removedCard = this.cards.pop();

        if (this.cards.length <= 2) {
            this.addNewCards(5);
            console.log("Voted on cards and added");
        }
        if (like) {
            this.recentCard = 'You liked: ' + removedCard.proj_name;
        } else {
            this.recentCard = 'You disliked: ' + removedCard.proj_name;
        }

    }

    // Add new cards to our array
    addNewCards(count: number) {
        console.log("Added new cards");
        this.firestore.getCards("candidate_id_1", count).then(map => {
            console.log(map.entries())
            map.forEach((value: any, key: id) => {
                this.cards.push(value)
                this.tags.push(value.skills)
                console.log(value)

            })
        })
    }

    getImage(i: number) {
        return "url(https://firebasestorage.googleapis.com/v0/b/collaboramos.appspot.com/o/862lg6wjnjd?alt=media&token=6c1025c4-8756-439a-9b36-a5d8ea35f7fd)";
    }

  getSize() {
    return '84px 108px'
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
