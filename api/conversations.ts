import express, {Request, Response} from "express";
import change from "./conversation-api/change";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {AuthType} from "./databaseMethods/auth";
import {db} from "../index";
import {ConversationMemberRole, ConversationType} from "../enums/conversations";
import {IConversation} from "../interfaces/conversations";
import {
    checkMembersToCreateConversation,
    createAsyncNotifications,
    createConversation,
    deleteConversation,
    getConversationData,
    getConversationsData,
    getFullConversationsData,
    setConversationToAllMembers
} from "./databaseMethods/conversations";
import {ResponseError} from "../enums/responses";
import {checkConversationType} from "./utils/checkEnums";
import {NotificationType} from "../enums/notifications";
import {IPublicUserData} from "../interfaces/users";

const conversations = express.Router();

/**
 *  @api {post} /api/ConversationComponent/create Создание беседы
 *  @apiName CreateConversation
 *  @apiGroup ConversationComponent
 *  @apiVersion 0.0.0
 *
 *  @apiExample {String} Типы бесед
 *     "SINGLE" - Обычная беседа из 2-х, никак не настраивается
 *     "GROUP" - Беседа из 2-х и более, настройки
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} type Тип беседы
 *  @apiBody {String[]} members список login тех кого нужно добавить в беседу
 *  @apiBody {String} icon (не обязательный) ссылка на иконку (только для GROUP)
 *  @apiBody {String} name (не обязательный) имя беседы (только для GROUP)
 *
 *
 *  @apiSuccess {Boolean} error Статус запроса
 *  @apiSuccess {Object} ConversationComponent беседа
 *  @apiSuccessExample {json} Response-Body
 *  {
 *      "error": false,
 *      "ConversationComponent": {
 *          // ... данные беседы
 *      }
 *  }
 *
 *  @apiError {Boolean} error Статус запроса
 *  @apiError {String} message Причина ошибки
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // type || members - не верны
 *  }
 *  @apiUse bre
 *  @apiUse bae
 */
conversations.post('/create', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        type: ConversationType,
        members: string[]
        name?: string
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body }) => {
        if (checkConversationType(body.type)) {
            const membersToConversation = await checkMembersToCreateConversation(db, body.members, userData.login, body.type);

            if (membersToConversation) {
                membersToConversation.push({
                    login: userData.login,
                    role: ConversationMemberRole.OWNER
                });

                return await createConversation(db, body.type, membersToConversation, body.name)
                    .then(async (conversation: IConversation<IPublicUserData<string>>) =>
                        await setConversationToAllMembers(db, membersToConversation, conversation.id)
                            .then(() => {
                                createAsyncNotifications<IConversation<IPublicUserData<string>>>(
                                    userData,
                                    body.members,
                                    {
                                        type: NotificationType.NEW_CONVERSATION,
                                        text: 'Добавил вас в беседу',
                                        data: {
                                            name: 'conversation',
                                            value: conversation
                                        }
                                    }
                                )

                                res.status(200).send({error: false, conversation})
                                return true;
                            })
                )
            }
        }

        res.status(200).send({error: true, message: ResponseError.NO_VALID_DATA})
    }).catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

/**
 *  @api {post} /api/ConversationComponent/get Получить информацию о беседе
 *  @apiName getConversation
 *  @apiGroup ConversationComponent
 *  @apiVersion 0.0.0
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} id id беседы
 *
 *  @apiSuccess {Boolean} error Статус запроса
 *  @apiSuccess {Object} ConversationComponent беседа
 *  @apiSuccessExample {json} Response-Body
 *  {
 *      "error": false,
 *      "ConversationComponent": {
 *          // ... данные беседы
 *      }
 *  }
 *
 *  @apiError {Boolean} error Статус запроса
 *  @apiError {String} message Причина ошибки
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // id - не верен
 *  }
 *  @apiUse bre
 *  @apiUse bae
 */
conversations.post('/get', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string }>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            return getConversationData(db, body.id, userData.login)
                .then((conversation) => res.status(200).send({ error: false, conversation }))
                .catch((_) => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }));
        });
})

/**
 *  @api {post} /api/ConversationComponent/getAll Получить информацию о беседах пользователя
 *  @apiName getConversations
 *  @apiGroup ConversationComponent
 *  @apiVersion 0.0.0
 *
 *  @apiUse authSession
 *
 *  @apiSuccess {Boolean} error Статус запроса
 *  @apiSuccess {Object[]} ConversationComponent Беседы
 *  @apiSuccessExample {json} Response-Body
 *  {
 *      "error": false,
 *      "ConversationComponent": [
 *          // ... данные беседы
 *      ]
 *  }
 *
 *  @apiError {Boolean} error Статус запроса
 *  @apiError {String} message Причина ошибки
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // что-то пошло вообще не так..
 *  }
 *  @apiUse bre
 *  @apiUse bae
 */
conversations.post('/getAll', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY).then(({ userData }) => {
        getConversationsData(db, userData.conversations)
            .then((conversations) =>
                res.status(200).send({ error: false, conversations }))
            .catch(() =>
                res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
    }).catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

conversations.post('/getFullInfoAll', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData }) => {
            getFullConversationsData(db, userData.conversations)
                .then((conversations) =>
                    res.status(200).send({ error: false, conversations }))
                .catch(() =>
                    res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
        })
});

/**
 *  @api {post} /api/ConversationComponent/delete Удалить беседу
 *  @apiName deleteConversations
 *  @apiGroup ConversationComponent
 *  @apiVersion 0.0.0
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} id id беседы
 *
 *  @apiSuccess {Boolean} error Статус запроса
 *  @apiSuccess {Boolean} success Статус
 *  @apiSuccessExample {json} Response-Body
 *  {
 *      "error": false,
 *      "success": true
 *  }
 *
 *  @apiError {Boolean} error Статус запроса
 *  @apiError {String} message Причина ошибки
 *  @apiUse nae
 *  @apiUse bre
 *  @apiUse bae
 */
conversations.post('/delete', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string }>(req, res, db, AuthType.SESSION_KEY).then(({ userData, body}) => {
        return deleteConversation(db, body.id, userData.login)
            .then((members) => {
                createAsyncNotifications<string>(
                    userData,
                    members,
                    {
                        type: NotificationType.CONVERSATION_REMOVED,
                        text: 'Удалил беседу',
                        data: {
                            name: 'conversationId',
                            value: body.id
                        }
                    }
                )

                res.status(200).send({ error: false, success: true })
            })
            .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_ACCESS }))
    });
})

conversations.use('/change', change);

export default conversations;