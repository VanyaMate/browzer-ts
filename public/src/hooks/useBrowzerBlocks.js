"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowzerBlocks = void 0;
const redux_1 = require("./redux");
const blocks_api_1 = require("../store/blocks/blocks.api");
const useBrowzerBlocks = function () {
    const blocks = (0, redux_1.useMySelector)((state) => state.blocks);
    const auth = (0, redux_1.useMySelector)((state) => state.auth);
    const { addComponent, removeComponent, changeComponent } = (0, redux_1.useActions)();
    const [dispatchAddComponent, { data: componentAddData }] = (0, blocks_api_1.useLazyAddComponentQuery)();
    const [dispatchRemoveComponent, { data: removeComponentData }] = (0, blocks_api_1.useLazyDeleteComponentQuery)();
    const [dispatchRenameComponent, { data: renameComponentData }] = (0, blocks_api_1.useLazyRenameComponentQuery)();
    return {
        addComponent: (blockIndex, name, type, handler) => {
            dispatchAddComponent({
                auth: auth.authKey,
                blockIndex,
                name,
                type
            })
                .then(({ data }) => {
                if (data === null || data === void 0 ? void 0 : data.component) {
                    addComponent({
                        blockIndex,
                        component: data.component
                    });
                    handler(false);
                }
            })
                .catch((_) => {
                handler(true);
            });
        },
        removeComponent: (blockIndex, id) => {
            dispatchRemoveComponent({
                auth: auth.authKey,
                blockIndex,
                id
            })
                .then(({ data }) => {
                if (data === null || data === void 0 ? void 0 : data.success) {
                    removeComponent({
                        blockIndex,
                        componentId: id
                    });
                }
            })
                .catch((_) => {
            });
        },
        renameComponent: (blockIndex, id, name) => {
            dispatchRenameComponent({
                auth: auth.authKey,
                blockIndex,
                id,
                name
            });
        }
    };
};
exports.useBrowzerBlocks = useBrowzerBlocks;
