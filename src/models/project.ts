import { Channel } from "./";

export interface Project {
    projectName: String,
    projectId: String,
    projectImage: String,
    description: String,
    isVisible: Boolean,
    tags: String[],
    chats: Channel[]
}