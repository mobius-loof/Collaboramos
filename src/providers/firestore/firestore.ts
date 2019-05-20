import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Account } from '../models/account'
// import { Project } from '../models/project'
import { Candidate, Project, Account } from '../../models'
import { async } from 'rxjs/internal/scheduler/async';
import { Subscribable, Subscription } from 'rxjs';
import { SelectPopover } from 'ionic-angular';
import { Observable } from 'rxjs';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {

  public project_profile: Observable<Project>;
  constructor(public firestore: AngularFirestore) { }
  // Account CRUD
  getAccount(id: string): AngularFirestoreDocument<Account> {
    return this.firestore.collection('accounts').doc(id);
  }

  // Candidate Profile CRUD
  getCandidateProfile(id: string): AngularFirestoreDocument<Candidate> {
    return this.firestore.collection('candidate_profiles').doc(id);
  }

  updateCandidateProfile(id: string): Promise<Candidate> {
    return null;
  }

  // Project Profile CRUD
  getProjectProfile(id: string): AngularFirestoreDocument<Project> {
    //var tempProject: Observable<Project>;
    this.project_profile = this.firestore.collection('project_profiles').doc(id).valueChanges();
    console.log(this.project_profile.description);

    return this.firestore.collection('project_profiles').doc(id);
  }
}
