"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const auth_api_1 = require("./auth/auth.api");
const auth_slice_1 = require("./auth/auth.slice");
const query_1 = require("@reduxjs/toolkit/query");
const friends_slice_1 = require("./friends/friends.slice");
const conversations_slice_1 = require("./conversations/conversations.slice");
const notifications_slice_1 = require("./notifications/notifications.slice");
const users_api_1 = require("./users/users.api");
const messages_api_1 = require("./messages/messages.api");
const messages_slice_1 = require("./messages/messages.slice");
const blocks_slice_1 = require("./blocks/blocks.slice");
const blocks_api_1 = require("./blocks/blocks.api");
const conversations_api_1 = require("./conversations/conversations.api");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        [auth_api_1.authApi.reducerPath]: auth_api_1.authApi.reducer,
        [users_api_1.usersApi.reducerPath]: users_api_1.usersApi.reducer,
        [messages_api_1.messagesApi.reducerPath]: messages_api_1.messagesApi.reducer,
        [conversations_api_1.conversationsApi.reducerPath]: conversations_api_1.conversationsApi.reducer,
        [blocks_api_1.blocksApi.reducerPath]: blocks_api_1.blocksApi.reducer,
        auth: auth_slice_1.authReducer,
        conversations: conversations_slice_1.conversationsReducer,
        friends: friends_slice_1.friendsReducer,
        notifications: notifications_slice_1.notificationsReducer,
        messages: messages_slice_1.messagesReducer,
        blocks: blocks_slice_1.blocksReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        auth_api_1.authApi.middleware,
        users_api_1.usersApi.middleware,
        messages_api_1.messagesApi.middleware,
        blocks_api_1.blocksApi.middleware,
        conversations_api_1.conversationsApi.middleware,
    ])
});
(0, query_1.setupListeners)(exports.store.dispatch);
