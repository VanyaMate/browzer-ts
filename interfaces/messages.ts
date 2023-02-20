import {MessageAdditionalType, SourceType} from "../enums/messages";

export interface IMessageSource {
    type: SourceType,
    name: string,
    icon: string
}

export interface IMessageAdditional {
    type: MessageAdditionalType,
    data: any
}

export interface IMessage {
    conversationId: string,
    from: IMessageSource,
    text: string,
    additional?: IMessageAdditional[],
    creationTime: number,
    changed: false,
}