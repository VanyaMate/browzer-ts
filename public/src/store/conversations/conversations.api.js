"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyRemoveConversationMemberQuery = exports.useLazyChangeConversationNameQuery = exports.useLazyChangeConversationMemberRoleQuery = exports.useLazyChangeConversationIconQuery = exports.useLazyAddMemberToConversationQuery = exports.useLazyDeleteConversationQuery = exports.useLazyCreateConversationQuery = exports.conversationsApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const react_2 = require("@reduxjs/toolkit/dist/query/react");
const consts_1 = require("../../common/consts");
exports.conversationsApi = (0, react_1.createApi)({
    reducerPath: 'conversations/api',
    baseQuery: (0, react_2.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/conversations/`
    }),
    endpoints: (build) => ({
        createConversation: build.query({
            query: (props) => ({
                url: 'create',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    type: props.type,
                    members: props.members,
                }
            }),
            transformResponse: (response) => {
                if (response.error) {
                    return false;
                }
                return response.conversation;
            }
        }),
        deleteConversation: build.query({
            query: (props) => ({
                url: 'delete',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    id: props.id,
                }
            }),
            transformResponse: (response) => {
                return response.error;
            }
        }),
        changeConversationName: build.query({
            query: (props) => ({
                url: 'change/name',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    value: props.name
                }
            })
        }),
        changeConversationIcon: build.query({
            query: (props) => ({
                url: 'change/icon',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    value: props.name
                }
            })
        }),
        changeConversationMemberRole: build.query({
            query: (props) => ({
                url: 'change/members/role',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    userLoginToChange: props.userLoginToChange,
                    role: props.role
                }
            })
        }),
        removeConversationMember: build.query({
            query: (props) => ({
                url: 'change/members/remove',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    userLoginToRemove: props.userLoginToRemove
                }
            })
        }),
        addMemberToConversation: build.query({
            query: (props) => ({
                url: 'change/members/add',
                method: "POST",
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    conversationId: props.conversationId,
                    userLoginToAdd: props.userLoginToAdd
                }
            })
        }),
    })
});
exports.useLazyCreateConversationQuery = exports.conversationsApi.useLazyCreateConversationQuery, exports.useLazyDeleteConversationQuery = exports.conversationsApi.useLazyDeleteConversationQuery, exports.useLazyAddMemberToConversationQuery = exports.conversationsApi.useLazyAddMemberToConversationQuery, exports.useLazyChangeConversationIconQuery = exports.conversationsApi.useLazyChangeConversationIconQuery, exports.useLazyChangeConversationMemberRoleQuery = exports.conversationsApi.useLazyChangeConversationMemberRoleQuery, exports.useLazyChangeConversationNameQuery = exports.conversationsApi.useLazyChangeConversationNameQuery, exports.useLazyRemoveConversationMemberQuery = exports.conversationsApi.useLazyRemoveConversationMemberQuery;
