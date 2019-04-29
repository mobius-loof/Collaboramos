import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Auth } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  credentials: { email: string, password: string } = {
    email: '',
    password: ''
  };

  private signupErrorString = 'Unable to create account. Please check your account information and try again.';

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private auth: Auth) {}

  doSignup() {
    console.log(this.credentials)
    this.auth.signup(this.credentials).then((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: 'You have successfully signed up!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((err) => {
      console.log(err)
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present(); 
    });
  }
}
