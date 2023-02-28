import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INotification} from "../../../../interfaces/notifications";
import {IMessage} from "../../../../interfaces/messages";

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: []
    } as {list: INotification<string>[]},
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification<string>[]>) => {
            state.list = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification<string>>) => {
            state.list.push(action.payload);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((n) => n.id !== action.payload);
        },
        resetNotifications: (state) => {
            state.list = [];
        }
    }
})

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;