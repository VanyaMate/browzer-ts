import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";
import {IConversation} from "../../../../interfaces/conversations";
import {IPublicUserData} from "../../../../interfaces/users";
import {ConversationType} from "../../../../enums/conversations";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import conversations from "../../../../api/conversations";

export const conversationsApi = createApi({
    reducerPath: 'conversations/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/conversations/`
    }),
    endpoints: (build) => ({
        createConversation: build.query<
            IConversation<IPublicUserData<string>> | false,
            { auth: string, type: ConversationType, members: string[] }
        >({
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
            transformResponse: (response: { error: boolean, conversation: IConversation<IPublicUserData<string>> }) => {
                if (response.error) { return false; }
                return response.conversation;
            }
        }),
        deleteConversation: build.query<
            boolean,
            { auth: string, id: string }
        >({
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
            transformResponse: (response: { error: boolean }) => {
                return response.error
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

export const {
    useLazyCreateConversationQuery,
    useLazyDeleteConversationQuery,
    useLazyAddMemberToConversationQuery,
    useLazyChangeConversationIconQuery,
    useLazyChangeConversationMemberRoleQuery,
    useLazyChangeConversationNameQuery,
    useLazyRemoveConversationMemberQuery
} = conversationsApi;