import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";
import {IMessage} from "../../../../interfaces/messages";

export const messagesApi = createApi({
    reducerPath: 'messages/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/messages/`
    }),
    endpoints: (build) => ({
        getFromConversation: build.query<
            IMessage[] | false,
            { auth: string, conversationId: string, limit: number, offset: number }
        >({
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
            transformResponse: (response: { error: boolean, messages: IMessage[] }) => {
                if (response.error) return false;
                return response.messages;
            },
        }),
        sendMessage: build.query<
            { message: IMessage, tempId?: string } | false,
            { auth: string, conversationId: string, text: string, tempId?: string }
        >({
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
            transformResponse: (response: { error: boolean, message: IMessage, tempId?: string }) => {
                if (response.error) return false;
                return { message: response.message, tempId: response.tempId };
            },
        })
    })
});

export const {useLazyGetFromConversationQuery, useLazySendMessageQuery} = messagesApi;