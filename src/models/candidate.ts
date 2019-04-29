import { Channel } from "./";

export interface Candidate {
    candidateName: String,
    candidaeId: String,
    projectImage: String,
    isVisible: Boolean,
    tags: String[],
    chats: Channel[]
}