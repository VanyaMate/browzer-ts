import {IUserPersonalInfo, IUserPreferences} from "../../../interfaces/user";
import {IPrivateUserData, IPublicUserData} from "../../../interfaces/users";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IUserDataStore {
    login: string,
    avatar: string,
    personalInfo: IUserPersonalInfo<string>,
    preferences: IUserPreferences
}

export const userSlice = createSlice({
    name: 'counter',
    initialState: {} as IUserDataStore,
    reducers: {
        setUserData: (state, action: PayloadAction<IPrivateUserData<string, string, string>>) => {
            state.login = action.payload.login;
            state.avatar = action.payload.avatar;
            state.personalInfo = action.payload.personalInfo;
            state.preferences = action.payload.preferences;
        },
        updateUserPreferences: (state, action) => {
            state.preferences = action.payload;
        },
        updateUserAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        updateUserPersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

