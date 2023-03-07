"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMessageAdditionalType = exports.checkMessageSourceType = exports.checkConversationType = exports.checkConversationRole = void 0;
const conversations_1 = require("../../enums/conversations");
const messages_1 = require("../../enums/messages");
const checkConversationRole = function (key) {
    if (conversations_1.ConversationMemberRole.OWNER === key)
        return true;
    if (conversations_1.ConversationMemberRole.MODERATOR === key)
        return true;
    if (conversations_1.ConversationMemberRole.SIMPLE === key)
        return true;
    return false;
};
exports.checkConversationRole = checkConversationRole;
const checkConversationType = function (key) {
    if (conversations_1.ConversationType.SINGLE === key)
        return true;
    if (conversations_1.ConversationType.GROUP === key)
        return true;
    return false;
};
exports.checkConversationType = checkConversationType;
const checkMessageSourceType = function (key) {
    if (messages_1.SourceType.GROUP === key)
        return true;
    if (messages_1.SourceType.USER === key)
        return true;
    return false;
};
exports.checkMessageSourceType = checkMessageSourceType;
const checkMessageAdditionalType = function (key) {
    if (messages_1.MessageAdditionalType.MUSIC === key)
        return true;
    if (messages_1.MessageAdditionalType.MESSAGE === key)
        return true;
    if (messages_1.MessageAdditionalType.FILE === key)
        return true;
    if (messages_1.MessageAdditionalType.IMAGE === key)
        return true;
    if (messages_1.MessageAdditionalType.VIDEO === key)
        return true;
    if (messages_1.MessageAdditionalType.LINK === key)
        return true;
    return false;
};
exports.checkMessageAdditionalType = checkMessageAdditionalType;
/*
export const function_name = function (key: string): boolean {

}
*/
