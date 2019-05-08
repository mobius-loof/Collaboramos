import { Channel } from "./";

export interface Project {
    name: string,
    id: string,
    image: string,
    description: string,
    isVisible: boolean,
    tags: string[],
    chats: {[id:string]:Channel}
}
