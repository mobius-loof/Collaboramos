import { Channel } from "./";

export interface Candidate {
    candidateName: string,
    candidateId: string,
    projectImage: string,
    isVisible: string,
    tags: string[],
    chats: {[id:string]:Channel}
}