import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCandidateProfilePage } from './view-candidate-profile';

@NgModule({
  declarations: [
    ViewCandidateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCandidateProfilePage),
  ],
})
export class ViewCandidateProfilePageModule {}
