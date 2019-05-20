import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Account } from '../models/account';
// import { Project } from '../models/project';
import { Candidate } from '../../models/candidate';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {
  account;

  constructor(public firestore: AngularFirestore) { }

  getCandidateProfile(id: string): Candidate {
    var accountDoc = this.firestore.collection('accounts').doc(id);
    return accountDoc.ref.get().then(doc => {
        this.factor = doc.data();
        console.log(doc.data());

        return doc.data();
    });
  }
}
