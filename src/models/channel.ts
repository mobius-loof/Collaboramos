import { Project, Candidate, Message } from "./";
import { DocumentReference } from "angularfire2/firestore";

export interface Channel {
    chatMemberProject: Project,
    chatMemberCandidate: Candidate,
    chatMemberProjectRef: DocumentReference,
    chatMemberCandidateRef: DocumentReference,
    lastMessageSent: Message,
    lastMessageSentRef: DocumentReference,
    recentMessagesSent: Message[],
    media: string[]
}