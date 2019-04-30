import { Channel } from "./";

export interface Candidate {
    candidateName: string,
    candidaeId: string,
    projectImage: string,
    isVisible: string,
    tags: string[],
    chats: any // id(String): Channel TODO
}