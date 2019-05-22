import { Channel, Candidate } from "./";

export interface Project {
    id: string,
    proj_name: string,
    images: string[],
    description: string,
    is_visible: boolean,
    tags: string[],
    chats: {[id: string]: Channel},
    interests: {[id: string]: Candidate},
    matches: {[id: string]: Candidate},
    waitlist: Candidate[]
}
>>>>>>> 1ca460c1a5befbb0bce5f22c1f7c9c41361fe684
