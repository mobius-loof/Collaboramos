import { Channel } from './'

export interface Message {
    sender_name: string, // idk whether this is sender or receiver?
    sender_id: string,
    receiver_name: string,
    receiver_id: string,
    channel_id: Channel,
    date: number, // # of ms since UNIX epoch, number returned by Date.now() in JS
    is_text: boolean, 
    media: string, 
    text: string
}