"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesReducer = exports.messagesActions = exports.messagesSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const getMessagesData = (message) => {
    return {
        end: false,
        loading: false,
        firstLoad: false,
        error: false,
        offset: 0,
        additionalLimit: 0,
        defaultLimit: 20,
        messages: message ? [message] : []
    };
};
exports.messagesSlice = (0, toolkit_1.createSlice)({
    name: 'messages',
    initialState: {},
    reducers: {
        setMessages: (state, action) => {
            for (let i = 0; i < action.payload.length; i++) {
                state[action.payload[i].id] = getMessagesData(action.payload[i].messages[0] || null);
            }
        },
        addMessage: (state, action) => {
            if (!state[action.payload.conversationId]) {
                state[action.payload.conversationId] = getMessagesData(action.payload);
            }
            else {
                state[action.payload.conversationId].messages.push(action.payload);
            }
        },
        addMessagesToEnd: (state, action) => {
            var _a;
            const conversationId = (_a = action.payload[0]) === null || _a === void 0 ? void 0 : _a.conversationId;
            if (conversationId) {
                const messages = [...action.payload];
                messages.reverse();
                state[conversationId].messages = [...messages, ...state[conversationId].messages];
                if (action.payload.length !== state[conversationId].defaultLimit) {
                    state[conversationId].end = true;
                }
            }
            else {
                state[conversationId].end = true;
            }
        },
        removeMessage: (state, action) => {
            const messagesData = state[action.payload.conversationId];
            if (messagesData) {
                messagesData.messages = messagesData.messages.filter((m) => m.id !== action.payload.id);
            }
        },
        changeMessage: (state, action) => {
            const messagesData = state[action.payload.conversationId];
            if (messagesData) {
                messagesData.messages.every((m) => {
                    if (m.id === action.payload.id) {
                        m.text = action.payload.text;
                        m.changed = true;
                        return false;
                    }
                    return true;
                });
            }
        },
        changeMessageText: (state, action) => {
            const messagesData = state[action.payload.conversationId];
            if (messagesData) {
                messagesData.messages.every((m) => {
                    if (m.id === action.payload.messageId) {
                        m.text = action.payload.text;
                        m.changed = true;
                        return false;
                    }
                    return true;
                });
            }
        },
        setMessageStatus: (state, action) => {
            var _a, _b, _c;
            const messagesData = state[action.payload.conversationId];
            if (messagesData) {
                for (let i = 0; i < messagesData.messages.length; i++) {
                    const message = messagesData.messages[i];
                    if (message.id === action.payload.id) {
                        message.error = (_a = action.payload.error) !== null && _a !== void 0 ? _a : message.error;
                        message.loading = (_b = action.payload.loading) !== null && _b !== void 0 ? _b : message.loading;
                        message.id = (_c = action.payload.newId) !== null && _c !== void 0 ? _c : message.id;
                        break;
                    }
                }
            }
        },
        setConversationMessagesStatus: (state, action) => {
            var _a, _b, _c, _d;
            const messagesData = state[action.payload.conversationId];
            if (messagesData) {
                messagesData.end = (_a = action.payload.end) !== null && _a !== void 0 ? _a : messagesData.end;
                messagesData.loading = (_b = action.payload.loading) !== null && _b !== void 0 ? _b : messagesData.loading;
                messagesData.firstLoad = (_c = action.payload.firstLoad) !== null && _c !== void 0 ? _c : messagesData.firstLoad;
                messagesData.error = (_d = action.payload.error) !== null && _d !== void 0 ? _d : messagesData.error;
            }
        },
        resetMessages: (state) => {
            for (const id in state) {
                delete state[id];
            }
        }
    }
});
exports.messagesActions = exports.messagesSlice.actions;
exports.messagesReducer = exports.messagesSlice.reducer;
