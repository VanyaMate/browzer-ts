import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {db} from "../../index";
import {AuthType} from "../databaseMethods/auth";
import {
    getConversationData, updateConversationField
} from "../databaseMethods/conversations";
import {ResponseError} from "../../enums/responses";
import members from "./members";
import {checkRoleAccess, checkUserIsModerator, getMemberDataByLogin} from "../methods/conversation";

const change = express.Router();

change.post('/name', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        value: string
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body}) => {
        const conversation = await getConversationData(db, body.conversationId, userData.login);
        const user = getMemberDataByLogin(conversation.members, userData.login);

        if (user && conversation) {
            if (checkRoleAccess(user.role, conversation.preferences.change)) {
                conversation.name = body.value;
                updateConversationField(db, body.conversationId, { name: body.value })
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_REQUEST }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        } else {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        }
    }).catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
});

change.post('/icon', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        value: string
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body}) => {
        const conversation = await getConversationData(db, body.conversationId, userData.login);
        const user = getMemberDataByLogin(conversation.members, userData.login);

        if (user) {
            if (checkRoleAccess(user.role, conversation.preferences.change)) {
                conversation.icon = body.value;
                updateConversationField(db, body.conversationId, { icon: body.value })
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_REQUEST }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        } else {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        }
    }).catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
});

change.use('/members', members);



export default change;