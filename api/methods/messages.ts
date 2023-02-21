import {IMessage, IMessageCreateData} from "../../interfaces/messages";
import * as crypto from "crypto";



export const createMessageData = function (data: IMessageCreateData): IMessage {
    const { conversationId, from, text, additional } = data;
    return {
        id: crypto.randomUUID(),
        conversationId, from, text, additional,
        creationTime: Date.now(),
        changed: false
    }
}