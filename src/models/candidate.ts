import { Channel } from "./";

export interface Candidate {
    candidateName: string,
    candidateId: string,
    candidateImage: string,
    description: string,
    resume: string,
    isVisible: boolean,
    tags: string[],
    chats: {[id:string]:Channel}
}
