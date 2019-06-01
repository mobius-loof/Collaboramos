import { Project, Candidate, Message } from "./";
import { DocumentReference } from "angularfire2/firestore";

export interface Channel {
    chat_member_project: Project,
    chat_member_candidate: Candidate,
    chat_member_project_ref: DocumentReference,
    chat_member_candidate_ref: DocumentReference,
    last_message_sent: Message,
    last_message_sent_ref: DocumentReference,
    recent_messages_sent: Message[]
}