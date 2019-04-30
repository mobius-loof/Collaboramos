import { Project, Candidate, Message } from "./";

export interface Channel {
    chatMemberProject: Project
    chatMemberCandidate: Candidate
    lastMessage: Message,
    recentMessagesSent: Message[],
    sharedMedia: string[]
}