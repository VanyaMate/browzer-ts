import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBlock, IComponent} from "../../../../interfaces/block";

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: {
        blocks: [] as IBlock[]
    },
    reducers: {
        setBlocks: (state, action: PayloadAction<IBlock[]>) => {
            state.blocks = action.payload;
        },
        addComponent: (state, action: PayloadAction<{ blockIndex: number, component: IComponent }>) => {
            const block = state.blocks[action.payload.blockIndex];
            if (block) {
                block.components.push(action.payload.component);
            }
        },
        removeComponent: (state, action: PayloadAction<{ blockIndex: number, componentId: string }>) => {
            const block = state.blocks[action.payload.blockIndex];
            if (block) {
                block.components = block.components.filter((c) => c.id !== action.payload.componentId);
            }
        },
        changeComponent: (state, action: PayloadAction<{ blockIndex: number, component: IComponent }>) => {
            const block = state.blocks[action.payload.blockIndex];
            if (block) {
                for (let i = 0; i < block.components.length; i++) {
                    if (block.components[i].id === action.payload.component.id) {
                        block.components[i] = action.payload.component;
                        break;
                    }
                }
            }
        },
        resetBlocks: (state) => {
            state.blocks = [];
        }
    }
})

export const blocksActions = blocksSlice.actions;
export const blocksReducer = blocksSlice.reducer;