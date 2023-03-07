"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogOut = exports.useLogIn = void 0;
const redux_1 = require("./redux");
const socketHooks_1 = require("./socketHooks");
const useLogIn = function () {
    const { setAuth, setConversations, setFriends, setNotifications, setMessages, setBlocks } = (0, redux_1.useActions)();
    const socketAuth = (0, socketHooks_1.useSocketAuth)();
    return (authData) => {
        setAuth({ login: authData.login, sessionKey: authData.sessionKey });
        setFriends(authData);
        setNotifications(authData.notifications);
        setConversations(authData.conversations);
        setMessages(authData.conversations);
        setBlocks(authData.blocks);
        socketAuth({ login: authData.login, sessionKey: authData.sessionKey });
    };
};
exports.useLogIn = useLogIn;
const useLogOut = function () {
    const { resetAuth, resetMessages, resetConversations, resetFriends, resetNotifications, resetBlocks } = (0, redux_1.useActions)();
    const socketDisconnect = (0, socketHooks_1.useSocketDisconnect)();
    return () => {
        socketDisconnect();
        resetAuth();
        resetConversations();
        resetFriends();
        resetNotifications();
        resetMessages();
        resetBlocks();
    };
};
exports.useLogOut = useLogOut;
