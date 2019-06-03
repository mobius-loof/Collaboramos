import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProjectPage } from './home-project';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { HomeProjectModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomeProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProjectPage),
    HttpModule,
    SwingModule,
    HomeProjectModule
  ],
  exports: [
    HomeProjectPage
  ]
})
export class HomeProjectPageModule { }
