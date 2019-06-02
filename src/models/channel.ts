import { Project, Candidate, Message } from "./";
import { DocumentReference } from "angularfire2/firestore";

export interface Channel {
    id: string,
    last_message_sent: string,
    last_message_sender: string,
    last_message_date: Date,
    members: string[]
}