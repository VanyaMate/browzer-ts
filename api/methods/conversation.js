"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDataByLogin = exports.checkRoleAccess = exports.checkGrossRole = exports.checkUserIsModerator = exports.checkUserIsOwner = exports.getConversationDataForCreate = void 0;
const conversations_1 = require("../../enums/conversations");
const getConversationDataForCreate = function (id, type, members, name) {
    return {
        id, type, members,
        name: name || '',
        messages: [],
        preferences: {
            members: {
                add: conversations_1.ConversationMemberRole.MODERATOR,
                remove: conversations_1.ConversationMemberRole.MODERATOR,
                role: conversations_1.ConversationMemberRole.MODERATOR,
            },
            delete: conversations_1.ConversationMemberRole.OWNER,
            change: conversations_1.ConversationMemberRole.MODERATOR,
        },
        creationTime: Date.now(),
    };
};
exports.getConversationDataForCreate = getConversationDataForCreate;
const checkUserIsOwner = function (members, login) {
    return members.some((member) => (member.login === login) &&
        (member.role === conversations_1.ConversationMemberRole.OWNER));
};
exports.checkUserIsOwner = checkUserIsOwner;
const checkUserIsModerator = function (members, login) {
    return members.some((member) => (member.login === login) &&
        (member.role !== conversations_1.ConversationMemberRole.SIMPLE));
};
exports.checkUserIsModerator = checkUserIsModerator;
const checkGrossRole = function (firstRole, secondRole) {
    if (firstRole === conversations_1.ConversationMemberRole.OWNER) {
        return !(secondRole === conversations_1.ConversationMemberRole.OWNER);
    }
    if (firstRole === conversations_1.ConversationMemberRole.MODERATOR) {
        return secondRole === conversations_1.ConversationMemberRole.SIMPLE;
    }
    return false;
};
exports.checkGrossRole = checkGrossRole;
const checkRoleAccess = function (userRole, accessRole) {
    if (userRole === conversations_1.ConversationMemberRole.OWNER)
        return true;
    if (userRole === conversations_1.ConversationMemberRole.MODERATOR) {
        if ((accessRole === conversations_1.ConversationMemberRole.MODERATOR) ||
            (accessRole === conversations_1.ConversationMemberRole.SIMPLE)) {
            return true;
        }
    }
    return false;
};
exports.checkRoleAccess = checkRoleAccess;
const getMemberDataByLogin = function (members, login) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].login === login) {
            return members[i];
        }
    }
    return null;
};
exports.getMemberDataByLogin = getMemberDataByLogin;
