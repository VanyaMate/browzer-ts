import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPrivateUserData, IPublicUserData} from "../../../interfaces/users";

export interface IFriendsStore {
    requestIn: IPublicUserData<string>[],
    requestOut: IPublicUserData<string>[],
    list: IPublicUserData<string>[]
}

export enum FriendsActionType {
    FRIEND_REQUEST_IN,
    FRIEND_REQUEST_OUT,
    FRIEND_LIST,
}

export const friendsStore = createSlice({
    name: 'friends',
    initialState: {} as IFriendsStore,
    reducers: {
        setFriends: (state, action: PayloadAction<IPrivateUserData<IPublicUserData<string>, string, string>>) => {
            state.requestIn = action.payload.friendsRequestIn;
            state.requestOut = action.payload.friendsRequestOut;
            state.list = action.payload.personalInfo.friends.value;
        },
        removeFriend: (state, action) => {
            switch (action.payload.type) {
                case FriendsActionType.FRIEND_REQUEST_IN:
                    state.requestIn = state.requestIn.filter((fr) => fr.login !== action.payload.login);
                    break;
                case FriendsActionType.FRIEND_REQUEST_OUT:
                    state.requestOut = state.requestOut.filter((fr) => fr.login !== action.payload.login);
                    break;
                case FriendsActionType.FRIEND_LIST:
                    state.list = state.list.filter((fr) => fr.login !== action.payload.login);
                    break;
                default:
                    break;
            }
        },
        addFriend: (state, action) => {
            switch (action.payload.type) {
                case FriendsActionType.FRIEND_REQUEST_IN:
                    state.requestIn.push(action.payload.data);
                    break;
                case FriendsActionType.FRIEND_REQUEST_OUT:
                    state.requestOut.push(action.payload.data);
                    break;
                case FriendsActionType.FRIEND_LIST:
                    state.list.push(action.payload.data);
                    break;
                default:
                    break;
            }
        }
    }
})

export const friendsActions = friendsStore.actions;
export default friendsStore.reducer;
