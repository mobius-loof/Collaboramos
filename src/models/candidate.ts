import { Channel, Project } from "./";

export interface Candidate {
    id: string,
    name: string,
    image: string,
    website: string,
    resume_URL: string,
    is_visible: boolean,
    skills: string[],
    description: string,
    chats: {[id: string]: Channel},
    interests: {[id: string]: Project},
    matches: {[id: string]: Project},
    waitlist: Project[],
    phone_number: string,
    email: string,
    address: string
}
