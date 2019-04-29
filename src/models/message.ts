export interface Message {
    memberName: String, // idk whether this is sender or receiver?
    memberId: String,
    date: String, // # of ms since UNIX epoch, number returned by Date.now() in JS
    isText: Boolean, 
    media: String, 
    text: String
}