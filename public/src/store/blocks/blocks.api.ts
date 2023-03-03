import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {serverUrl} from "../../common/consts";
import {ComponentType} from "../../../../enums/blocks";
import {IResponseBody} from "../../../../interfaces/response";
import {IComponent} from "../../../../interfaces/block";

export const blocksApi = createApi({
    reducerPath: 'blocks/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${serverUrl}/api/user/block/`
    }),
    endpoints: (build) => ({
        addComponent: build.query<
            { error: boolean, component?: IComponent},
            { auth: string, blockIndex: number, name: string, type: ComponentType }
        >({
            query: ({ auth, blockIndex, name, type }) => ({
                url: 'add',
                method: 'post',
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    blockIndex, name, type
                }
            })
        }),
        deleteComponent: build.query<
            { error: boolean, success?: boolean, message?: string },
            { auth: string, blockIndex: number, id: string }
        >({
            query: ({auth, blockIndex, id}) => ({
                url: 'delete',
                method: 'post',
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    blockIndex, id
                }
            })
        })
    })
})

export const {useLazyAddComponentQuery, useLazyDeleteComponentQuery} = blocksApi;