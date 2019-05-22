import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeCandidatePage } from './home-candidate';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    HomeCandidatePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeCandidatePage),
    HttpModule,
    SwingModule,
  ],
  exports: [
    HomeCandidatePage
  ]
})
export class HomeCandidatePageModule { }
