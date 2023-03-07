"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authActions = exports.authReducer = exports.authSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const consts_1 = require("../../common/consts");
const authPrefix = `${consts_1.storagePrefix}auth`;
const savedData = JSON.parse(localStorage.getItem(authPrefix) || '""');
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: {
        login: '',
        sessionKey: '',
        authKey: (savedData || '')
    },
    reducers: {
        setAuth: (state, action) => {
            state.login = action.payload.login;
            state.sessionKey = action.payload.sessionKey;
            state.authKey = action.payload.login + ':' + action.payload.sessionKey;
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        },
        updateSessionKey: (state, action) => {
            state.sessionKey = action.payload;
            state.authKey = state.login + ':' + action.payload;
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        },
        resetAuth: (state) => {
            state.authKey = '';
            localStorage.setItem(authPrefix, JSON.stringify(state.authKey));
        }
    }
});
exports.authReducer = exports.authSlice.reducer;
exports.authActions = exports.authSlice.actions;
