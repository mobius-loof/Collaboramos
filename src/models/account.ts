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
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  projectProfile: Project,
  candidateProfile: Candidate,
  profileImageURI: URL,
  location: string
}
