import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User, Auth, Firestore } from '../../providers';
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
    private auth: Auth,
    private firestore: Firestore,
    private loadingCtrl: LoadingController
  ) {}

  cancel() {
    this.navCtrl.pop()
  }

  // Attempt to login in through our User service
  doLogin() {
    let params = {};

    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();

    this.auth.login(this.credentials).then((user) => {
      return this.firestore.getAccount(user.user.uid);
    }).then( acc => {
      params['account'] = acc;
      if (acc.project_id == null) {
        return null;
      } else {
        return this.firestore.getProjectProfileFromID(acc.project_id.id);
      }
    }).then( projectProfile => {
      params['projectProfile'] = projectProfile;
      let acc = params['account'];
      if (acc.candidate_id == null) {
        return null;
      } else {
        return this.firestore.getCandidateProfileFromID(acc.candidate_id.id);
      }
    }).then ( candidateProfile => {
      params['candidateProfile'] = candidateProfile;
    }).then( _ => {
      loading.dismiss();
      if (params['candidateProfile'] == null && params['projectProfile'] == null) {
        // take them to the profile creation page
      } else {
        this.navCtrl.setRoot(MainPage, params);
        this.showLoginSuccess();     
      }
    }).catch((err) => {
      this.showLoginFailure(err.message);
    });
  }

  showLoginSuccess() {
    let toast = this.toastCtrl.create({
      message: 'You have successfully logged in!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showLoginFailure(error_msg) {
    // Unable to sign up
      let toast = this.toastCtrl.create({
        message: error_msg,
        duration: 3000,
        position: 'top'
      });
      toast.present();
  }
}