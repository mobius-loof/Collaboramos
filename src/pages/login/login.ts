import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User, Auth, Firestore } from '../../providers';
import { MainPage } from '../';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  private credentials: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private auth: Auth,
    private firestore: Firestore,
    private loadingCtrl: LoadingController,
    private appCom: MyApp
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
      params['candidateProfileRef'] = acc.candidate_ref;
      params['projectProfileRef'] = acc.project_ref;

      this.appCom.setAccount(acc);
      this.appCom.setProjectProfileRef(acc.project_ref);
      this.appCom.setCandidateProfileRef(acc.candidate_ref);

      if (acc.project_ref == null) {
        return null;
      } else {
        return this.firestore.getProjectProfileFromID(acc.project_ref.id);
      }
    }).then( projectProfile => {
      params['projectProfile'] = projectProfile;
      this.appCom.setProjectProfile(projectProfile);

      let acc = params['account'];
      if (acc.candidate_ref == null) {
        return null;
      } else {
        return this.firestore.getCandidateProfileFromID(acc.candidate_ref.id);
      }
    }).then ( candidateProfile => {
      params['candidateProfile'] = candidateProfile;
      this.appCom.setCandidateProfile = candidateProfile;
    }).then( _ => {
      params['currentProfile'] = this.getSelectedProfile(params);
      loading.dismiss();

      if (params['candidateProfile'] == null && params['projectProfile'] == null) {
        this.navCtrl.setRoot("CreateProfilePage", params);
        this.showLoginSuccess();
      } else {
        this.navCtrl.setRoot(MainPage, params);
        this.showLoginSuccess();     
      }
    }).catch((err) => {
      this.showLoginFailure(err.message);
      loading.dismiss();
    });
  }

  getSelectedProfile(params) {
    if (params['candidateProfile'] != null) {
      return 'candidate';
    } else if (params['projectProfile'] != null) {
      return 'project';
    } else {
      return '';
    }
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
        position: 'bottom'
      });
      toast.present();
  }
}