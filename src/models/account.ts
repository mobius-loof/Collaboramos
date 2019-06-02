import { Project, Candidate } from './'
import { DocumentReference } from 'angularfire2/firestore';

/**
 * The Account service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Account {

  constructor(json: any) {
    
  }

}

export interface Account {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  project_ref: DocumentReference,
  candidate_ref: DocumentReference,
  project: Project,
  candidate: Candidate,
  address: string
}
