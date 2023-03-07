"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthSessionKeyQuery = exports.useLazyAuthSessionKeyQuery = exports.useLazyAuthPassQuery = exports.authApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const consts_1 = require("../../common/consts");
exports.authApi = (0, react_1.createApi)({
    reducerPath: 'auth/api',
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/auth/`
    }),
    endpoints: (build) => ({
        authPass: build.query({
            query: (auth) => ({
                url: 'pass',
                method: "POST",
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            transformResponse: (response) => {
                if (response.error)
                    return false;
                return response.data;
            },
        }),
        authSessionKey: build.query({
            query: (auth) => ({
                url: 'sessionKey',
                method: "POST",
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            transformResponse: (response) => {
                if (response.error)
                    return false;
                return response.data;
            },
        })
    })
});
exports.useLazyAuthPassQuery = exports.authApi.useLazyAuthPassQuery, exports.useLazyAuthSessionKeyQuery = exports.authApi.useLazyAuthSessionKeyQuery, exports.useAuthSessionKeyQuery = exports.authApi.useAuthSessionKeyQuery;
