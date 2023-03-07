"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsReducer = exports.friendsActions = exports.friendsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const defaultState = {
    requestsIn: [],
    requestsOut: [],
    friends: [],
};
exports.friendsSlice = (0, toolkit_1.createSlice)({
    name: 'friends',
    initialState: defaultState,
    reducers: {
        setFriends: (state, action) => {
            state.requestsIn = action.payload.friendsRequestIn;
            state.requestsOut = action.payload.friendsRequestOut;
            state.friends = action.payload.personalInfo.friends.value;
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter((f) => f.login !== action.payload);
        },
        addRequestIn: (state, action) => {
            state.requestsIn.push(action.payload);
        },
        removeRequestIn: (state, action) => {
            state.requestsIn = state.requestsIn.filter((f) => f.login !== action.payload);
        },
        addRequestOut: (state, action) => {
            state.requestsOut.push(action.payload);
        },
        removeRequestOut: (state, action) => {
            state.requestsOut = state.requestsOut.filter((f) => f.login !== action.payload);
        },
        resetFriends: (state) => {
            state = {
                requestsIn: [],
                requestsOut: [],
                friends: [],
            };
        }
    }
});
exports.friendsActions = exports.friendsSlice.actions;
exports.friendsReducer = exports.friendsSlice.reducer;
