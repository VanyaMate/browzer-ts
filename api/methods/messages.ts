import {IMessage, IMessageCreateData, IMessageSource} from "../../interfaces/messages";
import * as crypto from "crypto";
import {IUserData} from "../../interfaces/users";
import {SourceType} from "../../enums/messages";



export const createMessageData = function (
    data: IMessageCreateData,
    type: SourceType,
    name: string,
    icon: string
): IMessage {
    const { conversationId, text, additional } = data;
    const from: IMessageSource = { type, name, icon };

    return {
        id: crypto.randomUUID(),
        conversationId, from, text,
        additional: additional || [],
        creationTime: Date.now(),
        changed: false
    }
}