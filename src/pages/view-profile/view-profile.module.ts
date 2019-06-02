import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileProjectPage } from './view-profile';

@NgModule({
  declarations: [
    ProfileProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileProjectPage),
  ],
})
export class ProfileProjectPageModule {}
