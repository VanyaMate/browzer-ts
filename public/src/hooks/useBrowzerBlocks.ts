import {useActions, useMySelector} from "./redux";
import {useLazyAddComponentQuery, useLazyDeleteComponentQuery} from "../store/blocks/blocks.api";
import {ComponentType} from "../../../enums/blocks";
import {IResponseBody} from "../../../interfaces/response";
import {IComponent} from "../../../interfaces/block";

export const useBrowzerBlocks = function () {
    const blocks = useMySelector((state) => state.blocks);
    const auth = useMySelector((state) => state.auth);
    const {
        addComponent,
        removeComponent,
        changeComponent
    } = useActions();
    const [dispatchAddComponent, {data: componentAddData }] = useLazyAddComponentQuery();
    const [dispatchRemoveComponent, {data: any }] = useLazyDeleteComponentQuery();

    return {
        addComponent: (blockIndex: number, name: string, type: ComponentType, handler: (error: boolean) => void) => {
            dispatchAddComponent({
                auth: auth.authKey,
                blockIndex,
                name,
                type
            })
                .then(({ data }) => {
                    if (data?.component) {
                        addComponent({
                            blockIndex,
                            component: data.component as IComponent
                        })
                        handler(false);
                    }
                })
                .catch((_) => {
                    handler(true);
                })
        },
        removeComponent: (blockIndex: number, id: string) => {
            dispatchRemoveComponent({
                auth: auth.authKey,
                blockIndex,
                id
            })
                .then(({ data }) => {
                    if (data?.success) {
                        removeComponent({
                            blockIndex,
                            componentId: id
                        })
                    }
                })
                .catch((_) => {

                })
        },
        changeComponent: () => {

        }
    }
}