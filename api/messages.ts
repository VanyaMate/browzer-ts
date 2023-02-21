import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {AuthType} from "./databaseMethods/auth";
import {db} from "../index";
import {IError} from "../interfaces/request";
import {ResponseError} from "../enums/responses";
import {IMessage, IMessageAdditional, IMessageCreateData} from "../interfaces/messages";
import {createMessageData} from "./methods/messages";
import {createMessage, deleteMessage, getMessage, updateMessage} from "./databaseMethods/messages";
import {getConversationData} from "./databaseMethods/conversations";
import {IConversation} from "../interfaces/conversations";

const messages = express.Router();

messages.post('/create', (req: Request, res: Response) => {
    validateRequestWithAccess<IMessageCreateData>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            const data = createMessageData(body);
            const conversation: IConversation = await getConversationData(db, body.conversationId, userData.login);

            if (conversation) {
                createMessage(db, data)
                    .then((message: IMessage) => {
                        res.status(200).send({error: false, message})
                    })
                    .catch((error: IError) => {
                        res.status(200).send({error: true, message: error.message})
                    })
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        })
        .catch((error: IError) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
});

messages.post('/change', (req: Request, res: Response) => {
    validateRequestWithAccess<{ messageId: string, text?: string, additional?: IMessageAdditional[] }>(req, res, db, AuthType.SESSION_KEY)
        .then(async ({ userData, body }) => {
            const message: IMessage = await getMessage(db, body.messageId);
            if (message.from.name === userData.login) {
                message.text = body.text || message.text;
                message.additional = body.additional || message.additional;
                message.changed = true;

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

export default messages;