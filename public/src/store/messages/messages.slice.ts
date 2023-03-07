import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../../../interfaces/messages";
import {IConversation} from "../../../../interfaces/conversations";
import messages from "../../../../api/messages";

export interface IMessagesData {
    end: boolean,
    loading: boolean,
    firstLoad: boolean,
    error: boolean,
    offset: number,
    additionalLimit: number,
    defaultLimit: number,
    messages: IMessage[]
}

const getMessagesData = (message?: IMessage): IMessagesData => {
    return {
        end: false,
        loading: false,
        firstLoad: false,
        error: false,
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
                state[action.payload[i].id] = getMessagesData(action.payload[i].messages[0] || null);
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
            const conversationId = action.payload[0]?.conversationId;
            if (conversationId) {
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
                        return false;
                    }
                    return true;
                })
            }
        },
        changeMessageText: (state, action: PayloadAction<{
            conversationId: string,
            messageId: string,
            text: string
        }>) => {
            const messagesData = state[action.payload.conversationId];

            if (messagesData) {
                messagesData.messages.every((m) => {
                    if (m.id === action.payload.messageId) {
                        m.text = action.payload.text;
                        m.changed = true;
                        return false;
                    }
                    return true;
                })
            }
        },
        setMessageStatus: (state, action: PayloadAction<{
            id: string,
            conversationId: string,
            newId?: string,
            error?: boolean,
            loading?: boolean
        }>) => {
            const messagesData = state[action.payload.conversationId];

            if (messagesData) {
                for (let i = 0; i < messagesData.messages.length; i++) {
                    const message = messagesData.messages[i];
                    if (message.id === action.payload.id) {
                        message.error = action.payload.error ?? message.error;
                        message.loading = action.payload.loading ?? message.loading;
                        message.id = action.payload.newId ?? message.id;
                        break;
                    }
                }
            }
        },
        setConversationMessagesStatus: (state, action: PayloadAction<{
            conversationId: string,
            end?: boolean,
            loading?: boolean,
            firstLoad?: boolean,
            error?: boolean,
        }>) => {
            const messagesData = state[action.payload.conversationId];

            if (messagesData) {
                messagesData.end = action.payload.end ?? messagesData.end;
                messagesData.loading = action.payload.loading ?? messagesData.loading;
                messagesData.firstLoad = action.payload.firstLoad ?? messagesData.firstLoad;
                messagesData.error = action.payload.error ?? messagesData.error;
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