"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsFriendOf = exports.getPrivateUserData = exports.getPublicUserData = void 0;
const users_1 = require("./users");
const getPublicUserData = function (ud) {
    return {
        login: ud.login,
        avatar: ud.avatar,
        personalInfo: (0, users_1.getPublicPersonalInfo)(ud.personalInfo),
        preferences: ud.preferences,
        creationTime: ud.creationTime
    };
};
exports.getPublicUserData = getPublicUserData;
const getPrivateUserData = function (ud) {
    return {
        login: ud.login,
        avatar: ud.avatar,
        blocks: ud.blocks,
        sessionKey: ud.sessionKey,
        creationTime: ud.creationTime,
        conversations: ud.conversations,
        personalInfo: ud.personalInfo,
        notifications: ud.notifications,
        preferences: ud.preferences,
        friendsRequestIn: ud.friendsRequestIn,
        friendsRequestOut: ud.friendsRequestOut
    };
};
exports.getPrivateUserData = getPrivateUserData;
const checkIsFriendOf = function (login, friends) {
    return friends.value.some((friend) => friend === login);
};
exports.checkIsFriendOf = checkIsFriendOf;
