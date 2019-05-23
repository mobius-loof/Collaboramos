import { Channel, Project } from "./";

export interface Candidate {
    id: string,
    name: string,
    image: string,
    resumeURL: string,
    is_visible: boolean,
    tags: string[],
    chats: {[id: string]: Channel},
    interests: {[id: string]: Project},
    matches: {[id: string]: Project},
    waitlist: Project[],
    phone: string,
    address: string,
    skills: string[]
}
