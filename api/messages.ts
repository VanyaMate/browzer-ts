import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {AuthType} from "./databaseMethods/auth";
import {db} from "../index";
import {IError} from "../interfaces/request";
import {ResponseError} from "../enums/responses";
import {IMessage, IMessageAdditional, IMessageCreateData} from "../interfaces/messages";
import {createMessageData} from "./methods/messages";
import {
    addAsyncMessageNotification,
    createMessage,
    deleteMessage,
    getMessage,
    getMessagesFromConversation,
    updateMessage
} from "./databaseMethods/messages";
import {createAsyncNotifications, getConversationData} from "./databaseMethods/conversations";
import {getMemberDataByLogin} from "./methods/conversation";
import {SourceType} from "../enums/messages";
import {NotificationType} from "../enums/notifications";
import {getWithoutValue} from "../utils/helpers";

const messages = express.Router();

messages.post('/create', (req: Request, res: Response) => {
    validateRequestWithAccess<IMessageCreateData>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            if (body.text && body.conversationId) {
                const data = createMessageData(body, SourceType.USER, userData.login);
                const conversation = await getConversationData(db, body.conversationId, userData.login);

                if (conversation) {
                    createMessage(db, data)
                        .then((message: IMessage) => {
                            const members = conversation.members.filter((member) => member.login !== userData.login);
                            addAsyncMessageNotification(db, userData, message, members.map((m) => m.login), NotificationType.NEW_MESSAGE);

                            res.status(200).send({error: false, message, tempId: body.tempId || null })
                        })
                        .catch((error: IError) => {
                            res.status(200).send({error: true, message: error.message})
                        })
                } else {
                    res.status(200).send({error: true, message: ResponseError.NO_ACCESS});
                }
                return;
            }

            throw new Error();
        })
        .catch((_: unknown) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
});

messages.post('/change', (req: Request, res: Response) => {
    validateRequestWithAccess<{ messageId: string, text?: string, additional?: IMessageAdditional[] }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            const message: IMessage = await getMessage(db, body.messageId);
            const oldText = message.text;

            if (message?.from.name === userData.login) {
                message.text = body.text || message.text;
                message.additional = body.additional || message.additional;
                message.changed = true;

                const conversation = await getConversationData(db, message.conversationId, userData.login);
                const conversationMembers = conversation.members.map((member) => member.login);
                const notificationMember = getWithoutValue(conversationMembers, userData.login);

                createAsyncNotifications(userData, notificationMember, {
                    type: NotificationType.MESSAGE_CHANGED,
                    text: '?????????????? ??????????????????',
                    data: {
                        name: 'message',
                        value: { oldText, message: message }
                    }
                })

                return await updateMessage(db, message)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS })
            }
        })
        .catch((error: IError) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
});

messages.post('/delete', (req: Request, res: Response) => {
    validateRequestWithAccess<{ messageId: string }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            const message: IMessage = await getMessage(db, body.messageId);
            if (message.from.name === userData.login) {
                return await deleteMessage(db, body.messageId)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS })
            }
        })
        .catch((error: IError) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
});

messages.post('/getFromConversation', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        limit: number,
        offset: number
    }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body}) => {
            const conversation = await getConversationData(db, body.conversationId, userData.login);
            if (conversation && getMemberDataByLogin(conversation.members, userData.login)) {
                getMessagesFromConversation(db, body.conversationId, body.limit, body.offset)
                    .then((messages: IMessage[]) => res.status(200).send({ error: false, messages }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        })
})

export default messages;