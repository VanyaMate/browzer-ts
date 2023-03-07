"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationsReducer = exports.conversationsActions = exports.conversationsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.conversationsSlice = (0, toolkit_1.createSlice)({
    name: 'conversations',
    initialState: {
        list: []
    },
    reducers: {
        setConversations: (state, action) => {
            state.list = [...action.payload].reverse() || [];
        },
        addConversation: (state, action) => {
            state.list.push(action.payload);
        },
        removeConversation: (state, action) => {
            state.list = state.list.filter((c) => c.id !== action.payload);
        },
        resetConversations: (state) => {
            state.list = [];
        }
    }
});
exports.conversationsActions = exports.conversationsSlice.actions;
exports.conversationsReducer = exports.conversationsSlice.reducer;
