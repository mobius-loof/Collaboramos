import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeEmailPage } from './change-email';

@NgModule({
  declarations: [
    ChangeEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeEmailPage),
  ],
})
export class ChangeEmailPageModule {}
