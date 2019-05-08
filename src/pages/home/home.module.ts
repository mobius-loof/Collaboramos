import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HttpModule,
    SwingModule,
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }
