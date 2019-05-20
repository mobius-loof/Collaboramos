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

  // Create Profile
  createProjectProfile(model: Project): Promise<void> {
    const id = this.firestore.createId(); // generate an ID

    // Returns promise of success/failure for creating the project document on Firestore
    return this.firestore.doc(`project_profiles/${id}`).set({
      description: model.description,
      images: model.images,
      is_visible: model.is_visible,
      proj_name: model.proj_name,
      tags: model.tags
    });

  }

  // Read Profile
  getProjectProfile(id: string): AngularFirestoreDocument<Project> {
    // Returns reference of the document to read
    return this.firestore.collection('project_profiles').doc(id);
  }

  // Update Profile
  updateProjectProfile(id: string, model: Project): Promise<void> {
    // Returns promise of success/failure for updating the project document on Firestore
    return this.firestore.doc(`project_profiles/${id}`).update({
      description: model.description,
      images: model.images,
      is_visible: model.is_visible,
      proj_name: model.proj_name,
      tags: model.tags
    });
  }

  // Delete Profile
  deleteProjectProfile(id: string): Promise<void> {
    // Returns promise of success/failure for deleting the project document on Firestore
    return this.firestore.doc(`project_profiles/${id}`).delete();
  }
}
