import express, {Request, Response} from "express";
import change from "./conversation-api/change";
import members from "./conversation-api/members";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {AuthType} from "./databaseMethods/auth";
import {db} from "../index";
import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IConversation} from "../interfaces/conversations";
import {
    checkMembersToCreateConversation,
    createConversation, deleteConversation, getConversationData,
    setConversationToAllMembers
} from "./databaseMethods/conversations";
import {ResponseError} from "../enums/responses";

const conversations = express.Router();

conversations.post('/create', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        type: ConversationType,
        members: string[],
        icon?: string,
        name?: string
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body }) => {
        const membersToConversation = await checkMembersToCreateConversation(db, body.members, userData.login);

        if (membersToConversation) {
            membersToConversation.push({
                login: userData.login,
                avatar: userData.avatar,
                role: ConversationMemberRole.OWNER
            });

            return await createConversation(db, body.type, membersToConversation, body.icon, body.name).then(async (conversation: IConversation) =>
                await setConversationToAllMembers(db, membersToConversation, conversation.id).then(() => {
                    res.status(200).send({ error: false, data: conversation })
                    return true;
                })
            )
        } else {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA })
        }
    })
})

conversations.post('/get', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string }>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            getConversationData(db, body.id, userData.login)
                .then((conversation) => res.status(200).send({ error: false, conversation }))
                .catch((_) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
        });
})

conversations.post('/getAll', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY).then(({ userData }) => {
        const conversationsIds = userData.conversations;

        Promise.all(conversationsIds.map(async(id) => {
            return await getConversationData(db, id, userData.login);
        }))
        .then((conversations) => {
            res.status(200).send({ error: false, conversations })
        })
        .catch(() => {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA })
        })
    });
})

conversations.post('/remove', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string }>(req, res, db, AuthType.SESSION_KEY).then(({ userData, body}) => {
        deleteConversation(db, body.id, userData.login)
            .then(() => res.status(200).send({ error: false, success: true }))
            .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_AUTH }))
    });
})

conversations.use('/change', change);
conversations.use('/members', members);

export default conversations;