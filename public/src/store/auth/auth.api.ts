import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {serverUrl} from "../../common/consts";
import {IPrivateUserData, IPublicUserData} from "../../../../interfaces/users";
import {INotification} from "../../../../interfaces/notifications";
import {IConversation} from "../../../../interfaces/conversations";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/auth/`
    }),
    endpoints: (build) => ({
        authPass: build.query<
            IPrivateUserData<
                IPublicUserData<string>,
                INotification<string>,
                IConversation<IPublicUserData<string>>
            >,
            string
        >({
            query: (auth: string) => ({
                url: 'pass',
                method: "POST",
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            transformResponse: (response: { error: boolean, data: any }) => {
                if (response.error) return false;
                return response.data;
            },
        }),
        authSessionKey: build.query<
            IPrivateUserData<
                IPublicUserData<string>,
                INotification<string>,
                IConversation<IPublicUserData<string>>
            >,
            string
        >({
            query: (auth: string) => ({
                url: 'sessionKey',
                method: "POST",
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            transformResponse: (response: { error: boolean, data: any }) => {
                if (response.error) return false;
                return response.data;
            },
        })
    })
});

export const {useLazyAuthPassQuery, useLazyAuthSessionKeyQuery, useAuthSessionKeyQuery} = authApi;