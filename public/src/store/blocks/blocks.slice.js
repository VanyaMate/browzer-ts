"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocksReducer = exports.blocksActions = exports.blocksSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.blocksSlice = (0, toolkit_1.createSlice)({
    name: 'blocks',
    initialState: {
        blocks: []
    },
    reducers: {
        setBlocks: (state, action) => {
            state.blocks = action.payload;
        },
        addComponent: (state, action) => {
            const block = state.blocks[action.payload.blockIndex];
            if (block) {
                block.components.push(action.payload.component);
            }
        },
        removeComponent: (state, action) => {
            const block = state.blocks[action.payload.blockIndex];
            if (block) {
                block.components = block.components.filter((c) => c.id !== action.payload.componentId);
            }
        },
        changeComponent: (state, action) => {
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
});
exports.blocksActions = exports.blocksSlice.actions;
exports.blocksReducer = exports.blocksSlice.reducer;
