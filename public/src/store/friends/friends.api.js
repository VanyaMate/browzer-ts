"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@reduxjs/toolkit/query/react");
const react_2 = require("@reduxjs/toolkit/dist/query/react");
const consts_1 = require("../../common/consts");
const friendsApi = (0, react_1.createApi)({
    reducerPath: 'friends/api',
    baseQuery: (0, react_2.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/friends/`
    }),
    endpoints: (build) => ({
        addToFriends: build.query({
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
                transformResponse: (response) => {
                    return response.error;
                }
            })
        }),
        removeFromFriends: build.query({
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
                transformResponse: (response) => {
                    return response.error;
                }
            })
        }),
    })
});
