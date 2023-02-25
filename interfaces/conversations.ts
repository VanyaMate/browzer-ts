import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IMessage} from "./messages";
import {AccessType} from "../enums/user";
import {IPublicUserData} from "./users";

export interface IConversationMember<F> {
    login: string,
    role: ConversationMemberRole,
    data?: F,
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

export interface IConversation<F> {
    id: string,
    type: ConversationType,
    members: IConversationMember<F>[],
    messages: IMessage[],
    preferences: IConversationPreferences,
    icon?: string,
    name?: string,
    creationTime: number
}