import { Channel } from './'
import { DocumentReference } from 'angularfire2/firestore';
import * as firebase from 'firebase';

export interface Message {
    channel_id: string,
    sender_id: string,
    sender_name: string,
    message: string, // # of ms since UNIX epoch, number returned by Date.now() in JS
    message_date: Date
}