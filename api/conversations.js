"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const change_1 = __importDefault(require("./conversation-api/change"));
const validateRequestMethods_1 = require("./utils/validateRequestMethods");
const auth_1 = require("./databaseMethods/auth");
const index_1 = require("../index");
const conversations_1 = require("../enums/conversations");
const conversations_2 = require("./databaseMethods/conversations");
const responses_1 = require("../enums/responses");
const checkEnums_1 = require("./utils/checkEnums");
const notifications_1 = require("../enums/notifications");
const conversations = express_1.default.Router();
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
conversations.post('/create', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, checkEnums_1.checkConversationType)(body.type)) {
            const membersToConversation = yield (0, conversations_2.checkMembersToCreateConversation)(index_1.db, body.members, userData.login, body.type);
            if (membersToConversation) {
                membersToConversation.push({
                    login: userData.login,
                    role: conversations_1.ConversationMemberRole.OWNER
                });
                return yield (0, conversations_2.createConversation)(index_1.db, body.type, membersToConversation, body.name)
                    .then((conversation) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield (0, conversations_2.setConversationToAllMembers)(index_1.db, membersToConversation, conversation.id)
                        .then(() => {
                        (0, conversations_2.createAsyncNotifications)(userData, body.members, {
                            type: notifications_1.NotificationType.NEW_CONVERSATION,
                            text: 'Добавил вас в беседу',
                            data: {
                                name: 'conversation',
                                value: conversation
                            }
                        });
                        res.status(200).send({ error: false, conversation });
                        return true;
                    });
                }));
            }
        }
        res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
    })).catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
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
conversations.post('/get', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        return (0, conversations_2.getConversationData)(index_1.db, body.id, userData.login)
            .then((conversation) => res.status(200).send({ error: false, conversation }))
            .catch((_) => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
    });
});
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
conversations.post('/getAll', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData }) => {
        (0, conversations_2.getConversationsData)(index_1.db, userData.conversations)
            .then((conversations) => res.status(200).send({ error: false, conversations }))
            .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
    }).catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
conversations.post('/getFullInfoAll', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData }) => {
        (0, conversations_2.getFullConversationsData)(index_1.db, userData.conversations)
            .then((conversations) => res.status(200).send({ error: false, conversations }))
            .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
    });
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
conversations.post('/delete', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => {
        return (0, conversations_2.deleteConversation)(index_1.db, body.id, userData.login)
            .then((members) => {
            (0, conversations_2.createAsyncNotifications)(userData, members, {
                type: notifications_1.NotificationType.CONVERSATION_REMOVED,
                text: 'Удалил беседу',
                data: {
                    name: 'conversationId',
                    value: body.id
                }
            });
            res.status(200).send({ error: false, success: true });
        })
            .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS }));
    });
});
conversations.use('/change', change_1.default);
exports.default = conversations;
