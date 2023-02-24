export interface IContainer {
    name: string,
    link: string,
    id: string,
}

export interface IBlock {
    containers: IContainer[],
    active: string
}