import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { HomeCandidateModule } from '../../components/components.module'
import { HomeProjectModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HttpModule,
    SwingModule,
    HomeCandidateModule,
    HomeProjectModule,
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
