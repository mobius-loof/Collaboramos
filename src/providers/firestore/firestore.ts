import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Candidate, Project, Account, Channel, Message } from '../../models';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Firestore {
  account;

  constructor(public firestore: AngularFirestore) { }
  // Account CRUD

  // Create Account
  createAccount(model: Account): Promise<void> {
    // create the account in Firestoer
    return this.firestore.doc(`accounts/${model.id}`).set({
      id: model.id,
      address: model.address,
      email: model.email,
      first_name: model.first_name,
      last_name: model.last_name,
      phone_number: model.phone_number,
      project_ref: model.project_ref,
      candidate_ref: model.candidate_ref,
    });
  }

  // Read Account
  getAccount(id: string): Promise<any> {
    return this.firestore.collection('accounts').doc(id).ref.get().then(doc => {
      console.log(doc);
      return doc.data();
    });
  }

  // Update Account
  updateAccount(id: string, model: Account): Promise<void> {
    
    return this.firestore.collection('accounts').doc(id).update({
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      phone_number: model.phone_number,
      project_ref: model.project_ref,
      candidate_ref: model.candidate_ref,
      address: model.address
    });
  }

  // Delete Account
  deleteAccount(id: string): Promise<void> {
    return this.firestore.collection('accounts').doc(id).delete();
  }

  // Candidate Profile CRUD

  // Create Candidate
  createCandidate(accountId: string, model: Candidate): Promise<void> {
    const id = this.firestore.createId();

    this.firestore.doc(`candidate_profiles/${id}`).set({
      id: id,
      name: model.name,
      image: model.image,
      website: model.website,
      resumeURL: model.resume_URL,
      is_visible: model.is_visible,
      skills: model.skills,
      description: model.description,
      phone_number: model.phone_number,
      email: model.email,
      address: model.address
    });

    return this.firestore.doc(`accounts/${id}`).update({
      candidate_ref: this.firestore.doc(`candidate_profiles/${id}`).ref
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
  updateCandidateProfile(model: Candidate): Promise<void> {
    return this.firestore.doc(`candidate_profiles/${model.id}`).update({
      name: model.name,
      image: model.image,
      website: model.website,
      resumeURL: model.resume_URL,
      is_visible: model.is_visible,
      skills: model.skills,
      description: model.description,
      phone_number: model.phone_number,
      email: model.email,
      address: model.address
    });
  }

  // Delete Candidate
  deleteCandidateProfile(id: string): Promise<void> {
    return this.firestore.collection('candidate_profiles').doc(id).delete();
  }

  // Project Profile CRUD

  // Create Profile
  createProjectProfile(accountId: string, model: Project): Promise<void> {
    const id = this.firestore.createId(); // generate an ID

    // Returns promise of success/failure for creating the project document on Firestore
    this.firestore.doc(`project_profiles/${id}`).set({
      id: id,
      name: model.name,
      image: model.image,
      website: model.website,
      is_visible: model.is_visible,
      frameworks: model.frameworks,
      skills: model.skills,
      description: model.description,
      phone_number: model.phone_number,
      email: model.email,
      address: model.address
    });

    return this.firestore.doc(`accounts/${accountId}`).update({
      project_ref: this.firestore.doc(`project_profiles/${id}`).ref
    })
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
  updateProjectProfile(model: Project): Promise<void> {
    // Returns promise of success/failure for updating the project document on Firestore
    return this.firestore.doc(`project_profiles/${model.id}`).update({
      name: model.name,
      image: model.image,
      website: model.website,
      is_visible: model.is_visible,
      frameworks: model.frameworks,
      skills: model.skills,
      description: model.description,
      phone_number: model.phone_number,
      email: model.email,
      address: model.address
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
      last_message_sender: model.last_message_sender,
      last_message_date: model.last_message_date,
      members: model.members
    });
  }

  // Read Channel
  getChannel(id: string): Promise<any> {
    return this.firestore.collection('channels').doc(id).ref.get().then(doc=> {
      return doc.data();
    });
  }

  getChannelsFromProfile(profileId: string): AngularFirestoreCollection {
    return this.firestore.collection('channels', ref => 
    ref.where('members', 'array-contains', profileId).orderBy('last_message_date', 'desc'));
  }

  getMatchesFromProfile(profileId: string): AngularFirestoreCollection {
    return this.firestore.collection('matches', ref => 
    ref.where('members', 'array-contains', profileId).orderBy('last_message_date', 'desc'));
  }

  // Update Channel
  updateChannel(id: string, model: Channel): Promise<void> {
    return this.firestore.doc(`channels/${id}`).update({
      last_message_sent: model.last_message_sent,
      last_message_sender: model.last_message_sender,
      last_message_date: model.last_message_date,
      members: model.members
    });
  }

  // Delete Channel
  deleteChannel(id: string): Promise<void> {
    return this.firestore.collection('channels').doc(id).delete();
  }

  // Get Messages in Chat
  getMessagesForChannel(id: string): AngularFirestoreCollection {
    return this.firestore.collection('messages', ref => ref.where('channel_id', '==', id).orderBy('message_date', 'asc'));
  }

  // CR for Messages
  createMessage(model: Message): Promise<void> {
    var id = this.firestore.createId(); // create new id
    var dateFromFirestore = firebase.firestore.FieldValue.serverTimestamp(); // get time at server

    // update last message sent for the channel
    this.firestore.collection('channels').doc(model.channel_id).update({
      last_message_sent: model.message,
      last_message_sender: model.sender_name,
      last_message_date: dateFromFirestore
    });

    // create new message and push to firestore
    return this.firestore.doc(`messages/${id}`).set({
      channel_id: model.channel_id,
      sender_id: model.sender_id,
      sender_name: model.sender_name,
      message: model.message,
      message_date: dateFromFirestore
    });
  }
}
