import { Channel, Candidate } from "./";

export interface Project {
    id: string,
    name: string,
    image: string,
    description: string,
    isVisible: boolean,
    tags: string[],
    chats: {[id: string]: Channel},
    interests: {[id: string]: Candidate},
    matches: {[id: string]: Candidate},
    waitlist: Candidate[]
}