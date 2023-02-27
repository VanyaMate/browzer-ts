import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPrivateUserData, IPublicUserData} from "../../../../interfaces/users";

export interface IFriendsData {
    requestsIn: IPublicUserData<string>[],
    requestsOut: IPublicUserData<string>[],
    friends: IPublicUserData<string>[]
}

const defaultState: IFriendsData = {
    requestsIn: [],
    requestsOut: [],
    friends: [],
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: defaultState,
    reducers: {
        setFriends: (state, action: PayloadAction<IPrivateUserData<IPublicUserData<string>, any, any>>) => {
            state.requestsIn = action.payload.friendsRequestIn;
            state.requestsOut = action.payload.friendsRequestOut;
            state.friends = action.payload.personalInfo.friends.value;
        },
        addFriend: (state, action: PayloadAction<IPublicUserData<string>>) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action: PayloadAction<string>) => {
            state.friends = state.friends.filter((f) => f.login !== action.payload);
        },
        addRequestIn: (state, action: PayloadAction<IPublicUserData<string>>) => {
            state.requestsIn.push(action.payload);
        },
        removeRequestIn: (state, action: PayloadAction<string>) => {
            state.requestsIn = state.requestsIn.filter((f) => f.login !== action.payload);
        },
        addRequestOut: (state, action: PayloadAction<IPublicUserData<string>>) => {
            state.requestsOut.push(action.payload);
        },
        removeRequestOut: (state, action: PayloadAction<string>) => {
            state.requestsOut = state.requestsOut.filter((f) => f.login !== action.payload);
        },
        resetFriends: (state) => {
            state = {
                requestsIn: [],
                requestsOut: [],
                friends: [],
            }
        }
    }
})

export const friendsActions = friendsSlice.actions;
export const friendsReducer = friendsSlice.reducer;