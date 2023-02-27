import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INotification} from "../../../../interfaces/notifications";
import {IPublicUserData} from "../../../../interfaces/users";

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [] as INotification<string>[],
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification<string>[]>) => {
            state = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification<string>>) => {
            state.push(action.payload);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state = state.filter((n) => n.id !== action.payload);
        },
        resetNotifications: (state) => {
            state = [];
        }
    }
})

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;