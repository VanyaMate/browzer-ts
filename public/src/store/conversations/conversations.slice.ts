import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversation} from "../../../../interfaces/conversations";
import {IPublicUserData} from "../../../../interfaces/users";
import {IMessage} from "../../../../interfaces/messages";

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: {
        list: []
    } as { list: IConversation<IPublicUserData<string>>[] },
    reducers: {
        setConversations: (state, action: PayloadAction<IConversation<IPublicUserData<string>>[]>) => {
            state.list = action.payload;
        },
        addConversation: (state, action: PayloadAction<IConversation<IPublicUserData<string>>>) => {
            state.list.push(action.payload);
        },
        removeConversation: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((c) => c.id !== action.payload);
        },
        resetConversations: (state) => {
            state.list = [];
        }
    }
});

export const conversationsActions = conversationsSlice.actions;
export const conversationsReducer = conversationsSlice.reducer;