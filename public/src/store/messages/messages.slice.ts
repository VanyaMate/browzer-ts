import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../../../interfaces/messages";
import {IConversation} from "../../../../interfaces/conversations";

export interface IMessagesData {
    end: boolean,
    offset: number,
    additionalLimit: number,
    defaultLimit: number,
    messages: IMessage[]
}

const getMessagesData = (message?: IMessage): IMessagesData => {
    return {
        end: false,
        offset: 0,
        additionalLimit: 0,
        defaultLimit: 20,
        messages: message ? [message] : []
    }
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {} as { [key: string]: IMessagesData },
    reducers: {
        setMessages: (state, action: PayloadAction<IConversation<any>[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                state[action.payload[i].id] = getMessagesData(action.payload[i].messages[0]);
            }
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            if (!state[action.payload.conversationId]) {
                state[action.payload.conversationId] = getMessagesData(action.payload);
            } else {
                state[action.payload.conversationId].messages.push(action.payload);
            }
        },
        addMessagesToEnd: (state, action: PayloadAction<IMessage[]>) => {
            const conversationId = action.payload[0].conversationId;
            if (action.payload) {
                const messages = [...action.payload];
                messages.reverse();
                state[conversationId].messages = [...messages, ...state[conversationId].messages];
                if (action.payload.length !== state[conversationId].defaultLimit) {
                    state[conversationId].end = true;
                }
            } else {
                state[conversationId].end = true;
            }
        },
        removeMessage: (state, action: PayloadAction<IMessage>) => {
            const messagesData = state[action.payload.conversationId];

            if (messagesData) {
                messagesData.messages = messagesData.messages.filter((m) => m.id !== action.payload.id);
            }
        },
        changeMessage: (state, action: PayloadAction<IMessage>) => {
            const messagesData = state[action.payload.conversationId];

            if (messagesData) {
                messagesData.messages.every((m) => {
                    if (m.id === action.payload.id) {
                        m.text = action.payload.text;
                        m.changed = true;
                        return true;
                    }
                    return true;
                })
            }
        },
        resetMessages: (state) => {
            for (const id in state) {
                delete state[id];
            }
        }
    }
})

export const messagesActions = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;