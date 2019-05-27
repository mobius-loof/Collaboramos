import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, MenuController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public menuCtrl: MenuController,
              public appCom: MyApp) {
    this.currentItems = this.items.query();
    this.menuCtrl.swipeEnable(false);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  createProject() {
    this.navCtrl.setRoot('CreateProjectPage');
  }

  createCandidate() {
    this.navCtrl.setRoot('CreateCandidatePage');
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  openMenu() {
    //have a variable that checks if edit was tapped; if was then would want to undo and reset colors
    if(!this.menuCtrl.isOpen() && this.appCom.isEdit()) {
      this.appCom.toggleProfileSettings();
    }
    this.menuCtrl.open();
  }
}
