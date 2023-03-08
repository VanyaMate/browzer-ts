import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./auth/auth.api";
import {authReducer} from "./auth/auth.slice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {friendsReducer} from "./friends/friends.slice";
import {conversationsReducer} from "./conversations/conversations.slice";
import {notificationsReducer} from "./notifications/notifications.slice";
import {usersApi} from "./users/users.api";
import {messagesApi} from "./messages/messages.api";
import {messagesReducer} from "./messages/messages.slice";
import {blocksReducer} from "./blocks/blocks.slice";
import {blocksApi} from "./blocks/blocks.api";
import {conversationsApi} from "./conversations/conversations.api";
import {serverConnectionReducer} from "./serverConnection/serverConnection.slice";
import {serverApi} from "./serverConnection/serverConnection.api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [conversationsApi.reducerPath]: conversationsApi.reducer,
        [blocksApi.reducerPath]: blocksApi.reducer,
        [serverApi.reducerPath]: serverApi.reducer,
        auth: authReducer,
        conversations: conversationsReducer,
        friends: friendsReducer,
        notifications: notificationsReducer,
        messages: messagesReducer,
        blocks: blocksReducer,
        serverStatus: serverConnectionReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        authApi.middleware,
        usersApi.middleware,
        messagesApi.middleware,
        blocksApi.middleware,
        conversationsApi.middleware,
        serverApi.middleware,
    ])
})

setupListeners(store.dispatch);

export type StoreType = ReturnType<typeof store.getState>;