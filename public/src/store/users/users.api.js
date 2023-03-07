"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetUsersListQuery = exports.useLazyGetUsersListQuery = exports.useLazyGetUsersDataByLoginsQuery = exports.useLazyGetUserQuery = exports.useLazyCreateUserQuery = exports.usersApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const react_2 = require("@reduxjs/toolkit/dist/query/react");
const consts_1 = require("../../common/consts");
exports.usersApi = (0, react_1.createApi)({
    reducerPath: 'users/api',
    baseQuery: (0, react_2.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/users/`
    }),
    endpoints: (build) => ({
        createUser: build.query({
            query: (data) => ({
                url: 'create',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: data
            }),
            transformResponse: (response) => {
                if (response.error)
                    return false;
                return response.data;
            },
        }),
        getUser: build.query({
            query: (body) => ({
                url: 'get',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response) => {
                if (!response.error) {
                    return response.data;
                }
                else {
                    return false;
                }
            }
        }),
        getUsersList: build.query({
            query: (body) => ({
                url: 'getList',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response) => {
                if (Array.isArray(response)) {
                    return response;
                }
                else {
                    return false;
                }
            }
        }),
        getUsersDataByLogins: build.query({
            query: (body) => ({
                url: 'getPublicDataByLoginList',
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body
            }),
            transformResponse: (response) => {
                if (Array.isArray(response)) {
                    return response;
                }
                else {
                    return false;
                }
            }
        }),
    })
});
exports.useLazyCreateUserQuery = exports.usersApi.useLazyCreateUserQuery, exports.useLazyGetUserQuery = exports.usersApi.useLazyGetUserQuery, exports.useLazyGetUsersDataByLoginsQuery = exports.usersApi.useLazyGetUsersDataByLoginsQuery, exports.useLazyGetUsersListQuery = exports.usersApi.useLazyGetUsersListQuery, exports.useGetUsersListQuery = exports.usersApi.useGetUsersListQuery;
