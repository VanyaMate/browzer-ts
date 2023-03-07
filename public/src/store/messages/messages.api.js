"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyDeleteMessageQuery = exports.useLazyChangeMessageQuery = exports.useLazySendMessageQuery = exports.useLazyGetFromConversationQuery = exports.messagesApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const react_2 = require("@reduxjs/toolkit/dist/query/react");
const consts_1 = require("../../common/consts");
exports.messagesApi = (0, react_1.createApi)({
    reducerPath: 'messages/api',
    baseQuery: (0, react_2.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/messages/`
    }),
    endpoints: (build) => ({
        getFromConversation: build.query({
            query: (props) => ({
                url: 'getFromConversation',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    limit: props.limit,
                    offset: props.offset
                }
            }),
            transformResponse: (response) => {
                if (response.error)
                    return false;
                return response.messages;
            },
        }),
        sendMessage: build.query({
            query: (props) => ({
                url: 'create',
                method: 'post',
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    text: props.text,
                    tempId: props.tempId || null
                }
            }),
            transformResponse: (response) => {
                if (response.error)
                    return false;
                return { message: response.message, tempId: response.tempId };
            },
        }),
        changeMessage: build.query({
            query: (props) => ({
                url: 'change',
                method: 'post',
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    text: props.text,
                    messageId: props.messageId
                }
            }),
            transformResponse: (response) => {
                return response.error;
            },
        }),
        deleteMessage: build.query({
            query: (props) => ({
                url: 'delete',
                method: 'post',
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    messageId: props.messageId
                }
            }),
            transformResponse: (response) => {
                return response.error;
            },
        }),
    })
});
exports.useLazyGetFromConversationQuery = exports.messagesApi.useLazyGetFromConversationQuery, exports.useLazySendMessageQuery = exports.messagesApi.useLazySendMessageQuery, exports.useLazyChangeMessageQuery = exports.messagesApi.useLazyChangeMessageQuery, exports.useLazyDeleteMessageQuery = exports.messagesApi.useLazyDeleteMessageQuery;
