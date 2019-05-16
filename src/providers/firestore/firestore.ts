import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {

  constructor(public firestore: AngularFirestore) {
    
  }

  getCandidateProfile() {
    return this.firestore.collection('candidate_profiles').doc<any>('L4wTy2ApbjJEzSavgXIL');
  }

}
