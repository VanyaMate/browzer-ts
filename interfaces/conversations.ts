import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IMessage} from "./messages";
import {AccessType} from "../enums/user";

export interface IConversationMember {
    login: string,
    avatar: string,
    role: ConversationMemberRole,
    addedTime?: number
}

export interface IConversation {
    id: string,
    type: ConversationType,
    members: IConversationMember[],
    messages: IMessage[],
    preferences: {
        members: {
            add: ConversationMemberRole,
            remove: ConversationMemberRole,
            role: ConversationMemberRole
        }
        delete: ConversationMemberRole,
        change: ConversationMemberRole
    }
    icon?: string,
    name?: string,
    creationTime: number
}