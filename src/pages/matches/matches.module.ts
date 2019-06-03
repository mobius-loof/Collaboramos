import { SharedModule } from '../../app/shared.module';
import { MatchesPage } from './matches';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    MatchesPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchesPage),
    SharedModule
  ],
  exports: [
    MatchesPage
  ]
})

export class MatchesPageModule { }