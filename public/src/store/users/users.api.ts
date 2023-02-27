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
        })
    })
})

export const {useLazyCreateUserQuery} = usersApi;