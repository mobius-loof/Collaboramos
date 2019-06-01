import { Channel } from './'
import { DocumentReference } from 'angularfire2/firestore';

export interface Message {
    channel_id: string,
    message: string, // # of ms since UNIX epoch, number returned by Date.now() in JS
    message_date: Date, 
    sent_by: DocumentReference, 
}