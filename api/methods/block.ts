import {IBlock, IComponent} from "../../interfaces/block";
import * as crypto from "crypto";
import {ComponentType} from "../../enums/blocks";

export const createContainerData = function (name: string, type: ComponentType): IComponent {
    return {
        name,
        type,
        data: {},
        id: crypto.randomUUID()
    }
}

export const removeContainerFrom = function (containers: IComponent[], id: string): IComponent[] {
    return containers.filter((container) => container.id !== id);
}

export const addContainerTo = function (containers: IComponent[], container: IComponent): IComponent[] {
    return [...containers, container];
}

export const getContainer = function (containers: IComponent[], id: string) {
    return containers.filter((container) => container.id === id)[0];
}

export const reorder = function (containers: IComponent[], id: string, order: number): IComponent[] {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].id === id) {
            const container = containers.splice(i, 1)[0];
            containers.splice(order, 0, container);
            break;
        }
    }
    return containers;
}