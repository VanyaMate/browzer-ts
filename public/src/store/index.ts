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

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        auth: authReducer,
        conversations: conversationsReducer,
        friends: friendsReducer,
        notifications: notificationsReducer,
        messages: messagesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        authApi.middleware, usersApi.middleware
    ])
})

setupListeners(store.dispatch);

export type StoreType = ReturnType<typeof store.getState>;