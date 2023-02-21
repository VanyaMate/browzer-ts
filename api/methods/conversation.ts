import {IConversation, IConversationMember} from "../../interfaces/conversations";
import {ConversationMemberRole, ConversationType} from "../../enums/conversations";

export const getConversationDataForCreate = function (
    id: string,
    type: ConversationType,
    members: IConversationMember[],
    icon?: string,
    name?: string,
): IConversation {
    return {
        id, type, members,
        icon: icon || '',
        name: name || '',
        messages: [],
        preferences: {
            members: {
                add: ConversationMemberRole.MODERATOR,
                remove: ConversationMemberRole.MODERATOR,
                role: ConversationMemberRole.MODERATOR,
            },
            delete: ConversationMemberRole.OWNER,
            change: ConversationMemberRole.MODERATOR,
        },
        creationTime: Date.now(),
    };
}

export const checkUserIsOwner = function (members: IConversationMember[], login: string): boolean {
    return members.some((member) =>
        (member.login === login) &&
        (member.role === ConversationMemberRole.OWNER))
}

export const checkUserIsModerator = function (members: IConversationMember[], login: string): boolean {
    return members.some((member) =>
        (member.login === login) &&
        (member.role !== ConversationMemberRole.SIMPLE)
    )
}

export const checkGrossRole = function (firstRole: ConversationMemberRole, secondRole: ConversationMemberRole): boolean {
    if (firstRole === ConversationMemberRole.OWNER) {
        return !(secondRole === ConversationMemberRole.OWNER);
    }
    if (firstRole === ConversationMemberRole.MODERATOR) {
        return secondRole === ConversationMemberRole.SIMPLE;
    }
    return false;
}

export const checkRoleAccess = function (userRole: ConversationMemberRole, accessRole: ConversationMemberRole): boolean {
    if (userRole === ConversationMemberRole.OWNER) return true;
    if (userRole === ConversationMemberRole.MODERATOR) {
        if (
            (accessRole === ConversationMemberRole.MODERATOR) ||
            (accessRole === ConversationMemberRole.SIMPLE)
        ) {
            return true;
        }
    }

    return false;
}

export const getMemberDataByLogin = function (members: IConversationMember[], login: string): IConversationMember | null {
    for (let i = 0; i < members.length; i++) {
        if (members[i].login === login) {
            return members[i];
        }
    }

    return null;
}