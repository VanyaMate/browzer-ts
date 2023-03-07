"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsReducer = exports.notificationsActions = exports.notificationsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.notificationsSlice = (0, toolkit_1.createSlice)({
    name: 'notifications',
    initialState: {
        list: []
    },
    reducers: {
        setNotifications: (state, action) => {
            state.list = action.payload;
        },
        addNotification: (state, action) => {
            state.list.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.list = state.list.filter((n) => n.id !== action.payload);
        },
        resetNotifications: (state) => {
            state.list = [];
        }
    }
});
exports.notificationsActions = exports.notificationsSlice.actions;
exports.notificationsReducer = exports.notificationsSlice.reducer;
