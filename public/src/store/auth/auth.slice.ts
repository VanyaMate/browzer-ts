import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPrivateUserData} from "../../../../interfaces/users";
import {storagePrefix} from "../../common/consts";

const authPrefix = `${storagePrefix}auth`;

const savedData = JSON.parse(localStorage.getItem(authPrefix) ?? "");

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: '',
        sessionKey: '',
        authKey: savedData || ''
    },
    reducers: {
        setAuth: (state, action: PayloadAction<{ login: string, sessionKey: string }>) => {
            state.login = action.payload.login;
            state.sessionKey = action.payload.login;
            state.authKey = action.payload.login + ':' + action.payload.sessionKey;
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        },
        updateSessionKey: (state, action: PayloadAction<string>) => {
            state.sessionKey = action.payload;
            state.authKey = state.login + ':' + action.payload;
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        },
        resetAuth: (state) => {
            state.login = '';
            state.sessionKey = '';
            state.authKey = '';
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;