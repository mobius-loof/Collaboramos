import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Auth } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  credentials: { email: string, password: string } = {
    email: '',
    password: ''
  };

  private loginErrorString = 'Unable to sign in. Please check your account information and try again'

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private auth: Auth) {}

  cancel() {
    this.navCtrl.pop()
  }

  // Attempt to login in through our User service
  doLogin() {
    this.auth.login(this.credentials).then((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: 'You have successfully logged in!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((err) => {
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
