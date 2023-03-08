import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";

export const serverApi = createApi({
    reducerPath: 'server/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/server/`
    }),
    endpoints: (build) => ({
        serverCheck: build.query<boolean, null>({
            query: (props) => ({
                url: 'check',
                method: 'get',
                mode: 'cors',
                headers: {},
                credentials: 'omit',
                referrerPolicy: "origin-when-cross-origin"
            })
        })
    })
})

export const {useServerCheckQuery} = serverApi;