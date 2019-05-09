import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileCandidatePage } from './profile-candidate';

@NgModule({
  declarations: [
    ProfileCandidatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileCandidatePage),
  ],
})
export class ProfileCandidatePageModule {}
