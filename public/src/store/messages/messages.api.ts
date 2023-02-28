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
            IMessage[],
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
            transformResponse: (response: { error: boolean, data: any }) => {
                if (response.error) return false;
                return response.data;
            },
        })
    })
});

export const {useLazyGetFromConversationQuery} = messagesApi;