import { Channel } from './'

export interface Message {
    senderName: string, // idk whether this is sender or receiver?
    senderId: string,
    receiverName: string,
    receiverId: string,
    channel: Channel,
    date: number, // # of ms since UNIX epoch, number returned by Date.now() in JS
    isText: boolean, 
    media: string, 
    text: string
}