import { Channel, Candidate } from "./";

export interface Project {
    id: string,
    proj_name: string,
    image: string,
    description: string,
    is_visible: boolean,
    frameworks: string[],
    skills: string[],
    chats: {[id: string]: Channel},
    interests: {[id: string]: Candidate},
    matches: {[id: string]: Candidate},
    waitlist: Candidate[],
    address: string,
    phone: string,
    email: string,
    website: string
}
