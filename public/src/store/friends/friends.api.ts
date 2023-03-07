import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";

const friendsApi = createApi({
    reducerPath: 'friends/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/friends/`
    }),
    endpoints: (build) => ({
        addToFriends: build.query<
            boolean,
            { auth: string, login: string }
        >({
            query: (props) => ({
                url: 'add',
                method: 'post',
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    login: props.login
                },
                transformResponse: (response: { error: boolean }) => {
                    return response.error;
                }
            })
        }),
        removeFromFriends: build.query<
            boolean,
            { auth: string, login: string }
            >({
            query: (props) => ({
                url: 'remove',
                method: 'post',
                headers: {
                    'auth': props.auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    login: props.login
                },
                transformResponse: (response: { error: boolean }) => {
                    return response.error;
                }
            })
        }),
    })
})