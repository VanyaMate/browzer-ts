import {ConversationMemberRole, ConversationType} from "../enums/conversations";

export interface IConversationMember {
    login: string,
    avatar: string,
    role: ConversationMemberRole,
    addedTime: number
}

export interface IConversation {
    id: string,
    type: ConversationType,
    members: IConversationMember[],
    icon?: string,
    name?: string,
    creationTime: number
}