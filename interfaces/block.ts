import {ComponentType} from "../enums/blocks";

export interface IComponent {
    name: string,
    type: ComponentType,
    data: { [key: string]: any },
    id: string,
}

export interface IBlock {
    components: IComponent[],
    active: string
}