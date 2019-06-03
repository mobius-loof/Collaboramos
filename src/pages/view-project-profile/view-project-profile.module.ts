import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewProjectProfilePage } from './view-project-profile';

@NgModule({
  declarations: [
    ViewProjectProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewProjectProfilePage),
  ],
})
export class ViewProjectProfilePageModule {}
