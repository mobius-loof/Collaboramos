import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Auth, Firestore } from '../../providers';
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
    private auth: Auth,
    private firestore: Firestore) {}

  cancel() {
    this.navCtrl.pop()
  }

  doSignup() {
    this.auth.signup(this.credentials).then((user) => {
      let a = {
        id: user.user.uid,
        first_name: "Godwin",
        last_name: "Pang",
        email: "gypang@ucsd.edu",
        phone_number: "123456789",
        project_id: null,
        candidate_id: null,
        address: "my home"
      }
      return this.firestore.createAccount(a).then((_) => {
        this.showSignupSuccess();
        this.navCtrl.pop();
      });
    }).catch((err) => {
      this.showSignupFailure(err.message)
    });
  }

  showSignupSuccess() {
    let toast = this.toastCtrl.create({
      message: 'You have successfully signed up!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showSignupFailure(error_msg) {
    let toast = this.toastCtrl.create({
      message: error_msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
