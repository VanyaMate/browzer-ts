import {ConversationMemberRole, ConversationType} from "../../enums/conversations";
import {MessageAdditionalType, SourceType} from "../../enums/messages";

export const checkConversationRole = function (key: string): boolean {
    if (ConversationMemberRole.OWNER === key) return true;
    if (ConversationMemberRole.MODERATOR === key) return true;
    if (ConversationMemberRole.SIMPLE === key) return true;
    return false;
}

export const checkConversationType = function (key: string): boolean {
    if (ConversationType.SINGLE === key) return true;
    if (ConversationType.GROUP === key) return true;
    return false;
}

export const checkMessageSourceType = function (key: string): boolean {
    if (SourceType.GROUP === key) return true;
    if (SourceType.USER === key) return true;
    return false;
}

export const checkMessageAdditionalType = function (key: string): boolean {
    if (MessageAdditionalType.MUSIC === key) return true;
    if (MessageAdditionalType.MESSAGE === key) return true;
    if (MessageAdditionalType.FILE === key) return true;
    if (MessageAdditionalType.IMAGE === key) return true;
    if (MessageAdditionalType.VIDEO === key) return true;
    if (MessageAdditionalType.LINK === key) return true;
    return false;
}

/*
export const function_name = function (key: string): boolean {

}
*/
