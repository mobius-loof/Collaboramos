import { Channel, Project } from "./";

export interface Candidate {
    id: string,
    name: string,
    image: string,
    resumeURL: string,
    isVisible: string,
    tags: string[],
    chats: {[id: string]: Channel},
    interests: {[id: string]: Project},
    matches: {[id: string]: Project},
    waitlist: Project[]
}