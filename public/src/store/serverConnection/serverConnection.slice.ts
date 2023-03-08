import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const serverConnectionSlice = createSlice({
    name: 'serverConnection',
    initialState: {
        opened: false,
        warning: false,
        error: false,
        fetching: false,
        message: '',
        timer: 0
    },
    reducers: {
        setServerStatus: (state, action: PayloadAction<{
            opened?: boolean,
            timer?: number,
            warning?: boolean,
            error?: boolean,
            fetching?: boolean,
            message?: string
        }>) => {
            clearTimeout(state.timer);
            if (action.payload.timer) state.timer = action.payload.timer;
            state.opened = action.payload.opened ?? false;
            state.warning = action.payload.warning ?? false;
            state.error = action.payload.error ?? false;
            state.fetching = action.payload.fetching ?? true;
            if (action.payload.message) state.message = action.payload.message;
        }
    }
})

export const serverConnectionActions = serverConnectionSlice.actions;
export const serverConnectionReducer = serverConnectionSlice.reducer;