import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from 'angularfire2/firestore';
import { Candidate, Project, Account, Channel } from '../../models'
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {
  account;

  constructor(public firestore: AngularFirestore,
              public filestorage: AngularFireStorage) { }
  // Account CRUD

  // Create Account
  createAccount(model: Account): Promise<void> {
    const id = this.firestore.createId(); // generate an ID

    // create the account in Firestoer
    return this.firestore.doc(`accounts/${id}`).set({
      address: model.address,
      candidate_id: model.candidate_id,
      email: model.email,
      first_name: model.first_name,
      last_name: model.last_name,
      phone_number: model.phone_number,
      profile_img: model.profile_image,
      project_id: model.project_id
    });
  }

  // Read Account
  getAccount(id: string): Promise<any> {
    return this.firestore.collection('accounts').doc(id).ref.get().then(doc => {
      return doc.data();
    });
  }

  // Update Account
  updateAccount(id: string, model: Account): Promise<void> {
    
    return this.firestore.collection('accounts').doc(id).update({
      address: model.address,
      candidate_id: model.candidate_id,
      email: model.email,
      first_name: model.first_name,
      last_name: model.last_name,
      phone_number: model.phone_number,
      profile_img: model.profile_image,
      project_id: model.project_id
    });
  }

  // Delete Account
  deleteAccount(id: string): Promise<void> {
    return this.firestore.collection('accounts').doc(id).delete();
  }

  // Candidate Profile CRUD

  // Create Candidate
  createCandidate(model: Candidate): Promise<void> {
    const id = this.firestore.createId();

    const fileId = this.firestore.createId(); // generate a file ID
    console.log(fileId); // debugging purposes

    return this.filestorage.ref(fileId).put(model.images[0]).then(ref => {
      return this.firestore.doc(`candidate_profiles/${id}`).set({
        id: id,
        description: model.description,
        files: model.files,
        images: fileId,
        is_visible: model.is_visible,
        tags: model.tags
      });
    });
  }

  // Read Candidate via ID
  getCandidateProfileFromID(id: string): Promise<any> {
    return this.firestore.collection('candidate_profiles').doc(id).ref.get().then(doc=> {
      return doc.data();
    });
  }

  // Read Candidate via Reference
  getCandidateProfileFromRef(ref: DocumentReference): Promise<any> {
    return ref.get().then(doc => {
      return doc.data();
    })
  }

  // Update Candidate
  updateCandidateProfile(id: string, model: Candidate): Promise<void> {
    return this.firestore.doc(`candidate_profiles/${id}`).update({
      description: model.description,
      files: model.files,
      images: model.images,
      is_visible: model.is_visible,
      tags: model.tags
    });
  }

  // Delete Candidate
  deleteCandidateProfile(id: string): Promise<void> {
    return this.firestore.collection('candidate_profiles').doc(id).delete();
  }

  // Project Profile CRUD

  // Create Profile
  createProjectProfile(model: Project): Promise<void> {
    const id = this.firestore.createId(); // generate an ID

    const fileId = this.firestore.createId(); // generate a file ID
    console.log(fileId); // debugging purposes

    // Returns promise of success/failure for creating the project document on Firestore
    return this.filestorage.ref(fileId).put(model.images[0]).then(ref => {
      return this.firestore.doc(`project_profiles/${id}`).set({
        description: model.description,
        id: id,
        images: fileId,
        is_visible: model.is_visible,
        proj_name: model.proj_name,
        frameworks: model.frameworks,
        skills: model.skills
      });
    });
  }

  // Read Profile via ID
  getProjectProfileFromID(id: string): Promise<any> {
    // Returns reference of the document to read
    return this.firestore.collection('project_profiles').doc(id).ref.get().then(doc => {
      return doc.data();
    });
  }
  // Read Profile via Reference
  getProjectProfileFromRef(ref: DocumentReference): Promise<any> {
    return ref.get().then(doc=> {
      return doc.data();
    });
  }

  // Update Profile
  updateProjectProfile(id: string, model: Project): Promise<void> {
    // Returns promise of success/failure for updating the project document on Firestore
    return this.firestore.doc(`project_profiles/${id}`).update({
      description: model.description,
      images: model.images,
      is_visible: model.is_visible,
      proj_name: model.proj_name,
      frameworks: model.frameworks,
      skills: model.skills
    });
  }

  // Delete Profile
  deleteProjectProfile(id: string): Promise<void> {
    // Returns promise of success/failure for deleting the project document on Firestore
    return this.firestore.doc(`project_profiles/${id}`).delete();
  }

  // Channel CRUD
  
  // Create Channel
  createChannel(model: Channel): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`channels/${id}`).set({
      id: id,
      last_message_sent: model.last_message_sent,
      media: model.media,
      members: [model.chat_member_candidate, model.chat_member_project]
    });
  }

  // Read Channel
  getChannel(id: string): Promise<any> {
    return this.firestore.collection('channels').doc(id).ref.get().then(doc=> {
      return doc.data();
    });
  }

  // Update Channel
  updateChannel(id: string, model: Channel): Promise<void> {
    return this.firestore.doc(`channels/${id}`).update({
      last_message_sent: model.last_message_sent,
      media: model.media,
      members: [model.chat_member_candidate, model.chat_member_project]
    });
  }

  // Delete Channel
  deleteChannel(id: string): Promise<void> {
    return this.firestore.collection('channels').doc(id).delete();
  }

  // Get Project Cards
  getCards(id: string, amount: number): Promise<any> {
    return this.firestore.collection('match_queries').doc(id).ref.get().then(doc=> {
      return doc.data();
    }).then(data => {
      var list: string[];
      list = data.queried_list;
      list.sort;
      var greatestId = list[list.length - 1];
      if (data.list_type == "project")
        return this.firestore.collection('project_profiles', ref => ref.where('id', '>', 'greatestId')
                                      .orderBy('id', 'asc').limit(amount)).ref.get();
      else
        return this.firestore.collection('candidate_profiles', ref => ref.where('id', '>', 'greatestId')
                                      .orderBy('id', 'asc').limit(amount)).ref.get();
    }).then(snapshot => {
      if (snapshot.empty) {
        console.log('No Matching Documents');
        return;
      }

      var cards = new Map();
      snapshot.forEach(doc => {
        cards.set(doc.id, doc.data());
      })
    })
  }
}