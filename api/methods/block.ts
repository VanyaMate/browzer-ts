import {IBlock, IContainer} from "../../interfaces/block";
import * as crypto from "crypto";

export const createContainerData = function (name: string, link: string): IContainer {
    return {
        name,
        link,
        id: crypto.randomUUID()
    }
}

export const removeContainerFrom = function (containers: IContainer[], id: string): IContainer[] {
    return containers.filter((container) => container.id !== id);
}

export const addContainerTo = function (containers: IContainer[], container: IContainer): IContainer[] {
    return [...containers, container];
}

export const getContainer = function (containers: IContainer[], id: string) {
    return containers.filter((container) => container.id === id)[0];
}

export const reorder = function (containers: IContainer[], id: string, order: number): IContainer[] {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].id === id) {
            const container = containers.splice(i, 1)[0];
            containers.splice(order, 0, container);
            break;
        }
    }
    return containers;
}