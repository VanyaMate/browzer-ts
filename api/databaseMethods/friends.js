"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromRequestIn = exports.removeFromRequestOut = exports.removeFromFriends = exports.addToRequests = exports.addToFriends = void 0;
const user_1 = require("./user");
const helpers_1 = require("../../utils/helpers");
const notifications_1 = require("../../enums/notifications");
const notifications_2 = require("./notifications");
const index_1 = require("../../index");
const user_2 = require("../methods/user");
const addToFriends = function (db, userData, userToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        userData.friendsRequestIn = (0, helpers_1.getWithoutValue)(userData.friendsRequestIn, userToAdd.login);
        userToAdd.friendsRequestOut = (0, helpers_1.getWithoutValue)(userToAdd.friendsRequestOut, userData.login);
        userData.personalInfo.friends.value = (0, helpers_1.addUniqueValueTo)(userData.personalInfo.friends.value, userToAdd.login);
        userToAdd.personalInfo.friends.value = (0, helpers_1.addUniqueValueTo)(userToAdd.personalInfo.friends.value, userData.login);
        const notification = yield (0, notifications_2.addNotification)(db, userToAdd, notifications_1.NotificationType.FRIEND_ACCEPT, {
            icon: userData.avatar,
            title: userData.login,
            message: 'Теперь друзья',
            data: {}
        });
        const userAddSocketConnect = index_1.socketManager.connections[userToAdd.login];
        index_1.socketManager.sendMessage(userAddSocketConnect, {
            type: notifications_1.NotificationType.FRIEND_ACCEPT,
            data: {
                user: (0, user_2.getPublicUserData)(userData), notification
            }
        });
        yield Promise.all([
            (0, user_1.updateUserData)(db, userData),
            (0, user_1.updateUserData)(db, userToAdd)
        ]);
        return notification;
    });
};
exports.addToFriends = addToFriends;
const addToRequests = function (db, userData, userToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        userData.friendsRequestOut = (0, helpers_1.addUniqueValueTo)(userData.friendsRequestOut, userToAdd.login);
        userToAdd.friendsRequestIn = (0, helpers_1.addUniqueValueTo)(userToAdd.friendsRequestIn, userData.login);
        const notification = yield (0, notifications_2.addNotification)(db, userToAdd, notifications_1.NotificationType.FRIEND_IN_REQUEST, {
            icon: userData.avatar,
            title: userData.login,
            message: 'Хочет дружить',
            data: {}
        });
        const userAddSocketConnect = index_1.socketManager.connections[userToAdd.login];
        index_1.socketManager.sendMessage(userAddSocketConnect, {
            type: notifications_1.NotificationType.FRIEND_IN_REQUEST,
            data: {
                user: (0, user_2.getPublicUserData)(userData), notification
            }
        });
        yield Promise.all([
            (0, user_1.updateUserData)(db, userData),
            (0, user_1.updateUserData)(db, userToAdd)
        ]);
        return notification;
    });
};
exports.addToRequests = addToRequests;
const removeFromFriends = function (db, userData, userToRemove) {
    return __awaiter(this, void 0, void 0, function* () {
        const userFriends = userData.personalInfo.friends.value;
        const userToRemoveFriends = userToRemove.personalInfo.friends.value;
        userData.personalInfo.friends.value = (0, helpers_1.getWithoutValue)(userFriends, userToRemove.login);
        userToRemove.personalInfo.friends.value = (0, helpers_1.getWithoutValue)(userToRemoveFriends, userData.login);
        userData.friendsRequestIn = (0, helpers_1.addUniqueValueTo)(userData.friendsRequestOut, userToRemove.login);
        userToRemove.friendsRequestOut = (0, helpers_1.addUniqueValueTo)(userToRemove.friendsRequestIn, userData.login);
        const notification = yield (0, notifications_2.addNotification)(db, userToRemove, notifications_1.NotificationType.FRIEND_REMOVE, {
            icon: userData.avatar,
            title: userData.login,
            message: 'Больше не друг',
            data: {}
        });
        const userRemoveSocketConnect = index_1.socketManager.connections[userToRemove.login];
        index_1.socketManager.sendMessage(userRemoveSocketConnect, {
            type: notifications_1.NotificationType.FRIEND_REMOVE,
            data: {
                user: (0, user_2.getPublicUserData)(userData), notification
            }
        });
        yield Promise.all([
            (0, user_1.updateUserData)(db, userData),
            (0, user_1.updateUserData)(db, userToRemove)
        ]);
        return notification;
    });
};
exports.removeFromFriends = removeFromFriends;
const removeFromRequestOut = function (db, userData, userToRemove) {
    return __awaiter(this, void 0, void 0, function* () {
        userData.friendsRequestOut = (0, helpers_1.getWithoutValue)(userData.friendsRequestOut, userToRemove.login);
        userToRemove.friendsRequestIn = (0, helpers_1.getWithoutValue)(userToRemove.friendsRequestIn, userData.login);
        const notification = yield (0, notifications_2.addNotification)(db, userToRemove, notifications_1.NotificationType.FRIEND_IN_REQUEST_CANCELED, {
            icon: userData.avatar,
            title: userData.login,
            message: 'Отменил заявку в друзья',
            data: {}
        });
        const userRemoveSocketConnect = index_1.socketManager.connections[userToRemove.login];
        index_1.socketManager.sendMessage(userRemoveSocketConnect, {
            type: notifications_1.NotificationType.FRIEND_IN_REQUEST_CANCELED,
            data: {
                user: (0, user_2.getPublicUserData)(userData), notification
            }
        });
        yield Promise.all([
            (0, user_1.updateUserData)(db, userData),
            (0, user_1.updateUserData)(db, userToRemove)
        ]);
        return notification;
    });
};
exports.removeFromRequestOut = removeFromRequestOut;
const removeFromRequestIn = function (db, userData, userToRemove) {
    return __awaiter(this, void 0, void 0, function* () {
        userData.friendsRequestIn = (0, helpers_1.getWithoutValue)(userData.friendsRequestIn, userToRemove.login);
        userToRemove.friendsRequestOut = (0, helpers_1.getWithoutValue)(userToRemove.friendsRequestOut, userData.login);
        const notification = yield (0, notifications_2.addNotification)(db, userToRemove, notifications_1.NotificationType.FRIEND_OUT_REQUEST_CANCELED, {
            icon: userData.avatar,
            title: userData.login,
            message: 'Отменил вашу заявку в друзья',
            data: {}
        });
        const userRemoveSocketConnect = index_1.socketManager.connections[userToRemove.login];
        index_1.socketManager.sendMessage(userRemoveSocketConnect, {
            type: notifications_1.NotificationType.FRIEND_OUT_REQUEST_CANCELED,
            data: {
                user: (0, user_2.getPublicUserData)(userData), notification
            }
        });
        yield Promise.all([
            (0, user_1.updateUserData)(db, userData),
            (0, user_1.updateUserData)(db, userToRemove)
        ]);
        return notification;
    });
};
exports.removeFromRequestIn = removeFromRequestIn;
