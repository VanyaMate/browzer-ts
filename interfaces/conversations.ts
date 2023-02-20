import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IMessage} from "./messages";

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
    icon?: string,
    name?: string,
    creationTime: number
}