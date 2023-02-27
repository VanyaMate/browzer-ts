import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversation} from "../../../../interfaces/conversations";
import {IPublicUserData} from "../../../../interfaces/users";

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: [] as IConversation<IPublicUserData<string>>[],
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation<IPublicUserData<string>>[]>) => {
            state.concat(action.payload);
        },
        addConversation: (state, action: PayloadAction<IConversation<IPublicUserData<string>>>) => {
            state.push(action.payload);
        },
        removeConversation: (state, action: PayloadAction<string>) => {
            state = state.filter((c) => c.id !== action.payload);
        },
        resetConversations: (state) => {
            state = [];
        }
    }
});

export const conversationsActions = conversationsSlice.actions;
export const conversationsReducer = conversationsSlice.reducer;