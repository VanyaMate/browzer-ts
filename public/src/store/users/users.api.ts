import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";
import {
    IPrivateUserData,
    IPublicUserData,
    IUserDataForCreate,
    IUserRequestCreateData
} from "../../../../interfaces/users";
import {INotification} from "../../../../interfaces/notifications";
import {IConversation} from "../../../../interfaces/conversations";

export const usersApi = createApi({
    reducerPath: 'users/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/users/`
    }),
    endpoints: (build) => ({
        createUser: build.query<
            IPrivateUserData<
                IPublicUserData<string>,
                INotification<string>,
                IConversation<IPublicUserData<string>>
            >,
            IUserRequestCreateData
        >({
            query: (data: IUserRequestCreateData) => ({
                url: 'create',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: data
            }),
            transformResponse: (response: { error: boolean, data: any }) => {
                if (response.error) return false;
                return response.data;
            },
        }),
        getUser: build.query<
            IPublicUserData<string> | false,
            { login: string }
        >({
            query: (body: {login: string}) => ({
                url: 'get',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response: { error: boolean, data: IPublicUserData<string> }) => {
                if (!response.error) {
                    return response.data;
                } else {
                    return false;
                }
            }
        }),
        getUsersList: build.query<
            IPublicUserData<string>[] | false,
            { login: string, limit: number, offset: number }
            >({
            query: (body: {login: string, limit: number, offset: number}) => ({
                url: 'getList',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response: { error: boolean } | IPublicUserData<string>[]) => {
                if (Array.isArray(response)) {
                    return response;
                } else {
                    return false;
                }
            }
        }),
        getUsersDataByLogins: build.query<
            IPublicUserData<string>[] | false,
            { loginList: string[] }
            >({
            query: (body: {loginList: string[]}) => ({
                url: 'getPublicDataByLoginList',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response: { error: boolean } | IPublicUserData<string>[]) => {
                if (Array.isArray(response)) {
                    return response;
                } else {
                    return false;
                }
            }
        }),
    })
})

export const {
    useLazyCreateUserQuery,
    useLazyGetUserQuery,
    useLazyGetUsersDataByLoginsQuery,
    useLazyGetUsersListQuery,
    useGetUsersListQuery
} = usersApi;