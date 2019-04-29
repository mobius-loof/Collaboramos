import { Project, Candidate} from './'

/**
 * The Account service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Account {

  constructor(json: any) {
    
  }

}

export interface Item {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  projectProfiles: Project[],
  candidateProfile: Candidate,
  profileImageURI: URL,
  location: String
}
