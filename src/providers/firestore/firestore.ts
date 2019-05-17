import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Account } from '../models/account'
// import { Project } from '../models/project'
import { Candidate } from '../../models/candidate'

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {

  constructor(public firestore: AngularFirestore) { }

  getCandidateProfile(id: string): Candidate {
    var docRef = this.firestore.collection('accounts').doc(id);
    docRef.get().then(function(doc) {
      if(!(doc.exists)) {
        console.log('It don;t exist');
      } else {
        console.log(doc.data());
      }
    }).catch(function(err) {
      console.log(err);
    });

    // console.log(docRef.candidate_id);
    // this.firestore.collection('accounts').doc(id).get().then(function(doc) {
    //   console.log(doc.data());
    // });

    // var candidate = account.candidate_id;
    // var name = account.first_name.concat(" ", account.last_name);

    // console.log(name);

    // const candy: Candidate = {
    //   id: candidate.select('id').get(),
    //   name: name,
    //   image: null,
    //   resumeURL: null,
    //   isVisible: candidate.select('is_visible').get(),
    //   tags: candidate.select('tags').get(),
    //   chats: null,
    //   interests: null,
    //   matches: null,
    //   waitlist: null
    // }

    // console.log(candy);

    // return candy;
    return null;
  }

}
