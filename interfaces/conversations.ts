import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IMessage} from "./messages";
import {AccessType} from "../enums/user";
import {IPublicUserData} from "./users";

export interface IConversationMember {
    login: string,
    role: ConversationMemberRole,
    data?: IPublicUserData,
    addedTime?: number
}

export interface IConversationPreferences {
    members: {
        add: ConversationMemberRole,
        remove: ConversationMemberRole,
        role: ConversationMemberRole
    }
    delete: ConversationMemberRole,
    change: ConversationMemberRole,
}

export interface IConversation {
    id: string,
    type: ConversationType,
    members: IConversationMember[],
    messages: IMessage[],
    preferences: IConversationPreferences,
    icon?: string,
    name?: string,
    creationTime: number
}