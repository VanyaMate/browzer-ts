import {useActions, useMySelector} from "./redux";
import {useLazyAddComponentQuery} from "../store/blocks/blocks.api";
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
    const [dispatchAddComponent, {isError, isLoading, data: componentData }] = useLazyAddComponentQuery();

    return {
        addComponent: (blockIndex: number, name: string, type: ComponentType) => {
            dispatchAddComponent({
                auth: auth.authKey,
                blockIndex,
                name,
                type
            })
                .then(({ data }) => {
                    console.log(data);
                    if (data?.component) {
                        addComponent({
                            blockIndex,
                            component: data.component as IComponent
                        })
                    }
                })
                .catch((_) => {
                    console.log('catch', _);
                })
        },
        removeComponent: () => {

        },
        changeComponent: () => {

        }
    }
}