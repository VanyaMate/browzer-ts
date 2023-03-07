"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMessagesSocket = exports.useConversationsSocket = exports.useFriendsSocket = exports.useSocketDisconnect = exports.useSocketAuth = void 0;
const redux_1 = require("./redux");
const main_1 = require("../main");
const notifications_1 = require("../../../enums/notifications");
const useSocketAuth = function () {
    const connectFriendsSocket = (0, exports.useFriendsSocket)();
    const connectConversationsSocket = (0, exports.useConversationsSocket)();
    const connectMessagesSocket = (0, exports.userMessagesSocket)();
    return (auth) => {
        connectFriendsSocket();
        connectConversationsSocket();
        connectMessagesSocket();
        console.log('connect sockets');
        main_1.socketClientManager.auth([auth.login, auth.sessionKey]);
    };
};
exports.useSocketAuth = useSocketAuth;
const useSocketDisconnect = function () {
    const auth = (0, redux_1.useMySelector)((state) => state.auth);
    return () => {
        main_1.socketClientManager.disconnect([auth.login, auth.sessionKey]);
        main_1.socketClientManager.resetHandlersFromSocket();
    };
};
exports.useSocketDisconnect = useSocketDisconnect;
const useFriendsSocket = function () {
    const { addRequestIn, addRequestOut, addFriend, removeFriend, removeRequestIn, removeRequestOut, addNotification } = (0, redux_1.useActions)();
    return () => {
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.FRIEND_IN_REQUEST, (data) => {
            const message = data;
            addRequestIn(message.user);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.FRIEND_IN_REQUEST_CANCELED, (data) => {
            const message = data;
            removeRequestIn(message.user.login);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.FRIEND_OUT_REQUEST_CANCELED, (data) => {
            const message = data;
            removeRequestOut(message.user.login);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.FRIEND_ACCEPT, (data) => {
            const message = data;
            removeRequestOut(message.user.login);
            addFriend(message.user);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.FRIEND_REMOVE, (data) => {
            const message = data;
            removeFriend(message.user.login);
            addRequestOut(message.user);
            addNotification(message.notification);
        });
    };
};
exports.useFriendsSocket = useFriendsSocket;
const useConversationsSocket = function () {
    const { addConversation, removeConversation, addNotification } = (0, redux_1.useActions)();
    return () => {
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.NEW_CONVERSATION, (data) => {
            const message = data;
            addConversation(message.conversation);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.CONVERSATION_REMOVED, (data) => {
            const message = data;
            removeConversation(message.conversationId);
            addNotification(message.notification);
        });
    };
};
exports.useConversationsSocket = useConversationsSocket;
const userMessagesSocket = function () {
    const { addMessage, removeMessage, changeMessage, addNotification } = (0, redux_1.useActions)();
    return () => {
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.NEW_MESSAGE, (data) => {
            console.log('NEW_MESSAGE', data);
            const message = data;
            addMessage(message.message);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.MESSAGE_REMOVED, (data) => {
            console.log('MESSAGE_REMOVED', data);
            const message = data;
            removeMessage(message.message);
            addNotification(message.notification);
        });
        main_1.socketClientManager.addHandlerOnSocket(notifications_1.NotificationType.MESSAGE_CHANGED, (data) => {
            console.log('MESSAGE_CHANGED', data);
            const message = data;
            changeMessage(message.message.message);
            addNotification(message.notification);
        });
    };
};
exports.userMessagesSocket = userMessagesSocket;
