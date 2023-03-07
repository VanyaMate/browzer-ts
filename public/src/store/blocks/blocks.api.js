"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyRenameComponentQuery = exports.useLazyDeleteComponentQuery = exports.useLazyAddComponentQuery = exports.blocksApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const react_2 = require("@reduxjs/toolkit/dist/query/react");
const consts_1 = require("../../common/consts");
exports.blocksApi = (0, react_1.createApi)({
    reducerPath: 'blocks/api',
    baseQuery: (0, react_2.fetchBaseQuery)({
        baseUrl: `${consts_1.serverUrl}/api/user/block/`
    }),
    endpoints: (build) => ({
        addComponent: build.query({
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
        deleteComponent: build.query({
            query: ({ auth, blockIndex, id }) => ({
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
        }),
        renameComponent: build.query({
            query: ({ blockIndex, id, name, auth }) => ({
                url: 'rename',
                method: 'post',
                headers: {
                    'auth': auth,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: {
                    blockIndex, id, name
                }
            })
        })
    })
});
exports.useLazyAddComponentQuery = exports.blocksApi.useLazyAddComponentQuery, exports.useLazyDeleteComponentQuery = exports.blocksApi.useLazyDeleteComponentQuery, exports.useLazyRenameComponentQuery = exports.blocksApi.useLazyRenameComponentQuery;
