import { Project, Candidate, Message } from "./";
import { DocumentReference } from "angularfire2/firestore";

export interface Channel {
    chatMemberProject: Project,
    chatMemberCandidate: Candidate,
    chat_member_project: DocumentReference,
    chat_member_candidate: DocumentReference,
    lastMessageSent: Message,
    last_message_sent: DocumentReference,
    recentMessagesSent: Message[],
    media: string[]
}