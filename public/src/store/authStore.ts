import {createSlice} from "@reduxjs/toolkit";

export interface IAuth {
    login: string,
    sessionKey: string,
    auth: string,
}

export const authStore = createSlice({
    name: 'auth',
    initialState: {} as IAuth,
    reducers: {
        setAuth: (state, action) => {
            state.login = action.payload.login;
            state.sessionKey = action.payload.sessionKey;
            state.auth = action.payload.login + ":" + action.payload.sessionKey;
        },
        updateSessionKey: (state, action) => {
            state.sessionKey = action.payload.sessionKey;
            state.auth = state.login + ":" + action.payload.sessionKey;
        },
        reset: (state) => {
            state.login = '';
            state.sessionKey = '';
            state.auth = '';
        }
    }
})

export const authActions = authStore.actions;
export default authStore.reducer;