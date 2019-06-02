import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Account } from '../../models/account';
import { User, Auth, Firestore } from '../../providers';
import { MainPage } from '../';
import { nullLiteral } from 'babel-types';

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

  account: Account = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    project_ref: null,
    candidate_ref: null,
    project: null,
    candidate: null,
    address: ""
  };

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
        first_name: this.account.first_name,
        last_name: this.account.last_name,
        email: this.account.email,
        phone_number: this.account.phone_number,
        project_id: null,
        candidate_id: null,
        address: this.account.address,
        project_ref: null,
        candidate_ref: null,
        project: null,
        candidate: null
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
      position: 'bottom'
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
