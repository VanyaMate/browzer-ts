import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./auth/auth.api";
import {authReducer} from "./auth/auth.slice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch);

export type StoreType = ReturnType<typeof store.getState>;