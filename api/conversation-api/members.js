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
const validateRequestMethods_1 = require("../utils/validateRequestMethods");
const index_1 = require("../../index");
const auth_1 = require("../databaseMethods/auth");
const conversations_1 = require("../databaseMethods/conversations");
const responses_1 = require("../../enums/responses");
const conversation_1 = require("../methods/conversation");
const checkEnums_1 = require("../utils/checkEnums");
const user_1 = require("../databaseMethods/user");
const members = express_1.default.Router();
/**
 *  @api {post} /api/ConversationComponent/change/members/role Изменение роли члена беседы
 *  @apiName ChangeConversationMemberRole
 *  @apiGroup ConversationComponent/change/members
 *  @apiVersion 0.0.0
 *
 *  @apiExample {String} Роли
 *     "OWNER" - владелец беседы. имеет все права. невозможно снять / удалить
 *     "MODERATOR" - модератор беседы. имеет права основанные на настройках беседы
 *     "SIMPLE" - гражданин рф
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} conversationId id беседы
 *  @apiBody {String} userLoginToChange login члена беседы
 *  @apiBody {String} role роль
 *
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
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // conversationId || changeMemberLogin || role - не верны
 *  }
 *  @apiUse nae
 *  @apiUse bre
 *  @apiUse bae
 */
members.post('/role', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const validRole = (0, checkEnums_1.checkConversationRole)(body.role);
        if (validRole) {
            const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
            const changeMember = (0, conversation_1.getMemberDataByLogin)(conversation.members, body.userLoginToChange);
            const user = (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login);
            if (user &&
                changeMember) {
                if ((0, conversation_1.checkGrossRole)(user.role, changeMember.role) &&
                    (0, conversation_1.checkRoleAccess)(user.role, conversation.preferences.members.role)) {
                    changeMember.role = body.role;
                    (0, conversations_1.updateConversationData)(index_1.db, conversation)
                        .then(() => res.status(200).send({ error: false, success: true }))
                        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST }));
                }
                else {
                    res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
                }
                return;
            }
        }
        res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
    }));
});
/**
 *  @api {post} /api/ConversationComponent/change/members/remove Удаление пользователя из беседы
 *  @apiName RemoveUserFromConversation
 *  @apiGroup ConversationComponent/change/members
 *  @apiVersion 0.0.0
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} conversationId id беседы
 *  @apiBody {String} userLoginToRemove login члена беседы
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
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // conversationId || removeMemberLogin - не верны
 *  }
 *  @apiUse nae
 *  @apiUse bre
 *  @apiUse bae
 */
members.post('/remove', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
        const user = (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login);
        const removedMember = (0, conversation_1.getMemberDataByLogin)(conversation.members, body.userLoginToRemove);
        if (user && removedMember) {
            if ((0, conversation_1.checkGrossRole)(user.role, removedMember.role) &&
                (0, conversation_1.checkRoleAccess)(user.role, conversation.preferences.members.remove)) {
                conversation.members = conversation.members.filter((member) => member.login !== body.userLoginToRemove);
                (0, conversations_1.updateConversationData)(index_1.db, conversation)
                    .then(() => __awaiter(void 0, void 0, void 0, function* () {
                    const removed = yield (0, user_1.removeConversationFromLogin)(index_1.db, body.userLoginToRemove, body.conversationId);
                    if (removed) {
                        res.status(200)
                            .send({ error: false, success: true });
                        return;
                    }
                    throw new Error(responses_1.ResponseError.BAD_REQUEST);
                }))
                    .catch((error) => res.status(200)
                    .send({ error: true, message: error.message }));
            }
            else {
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
            }
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
    }));
});
/**
 *  @api {post} /api/ConversationComponent/change/members/add Добавление пользователя в беседу
 *  @apiName AddUserToConversation
 *  @apiGroup ConversationComponent/change/members
 *  @apiVersion 0.0.0
 *
 *  @apiUse authSession
 *
 *  @apiBody {String} conversationId id беседы
 *  @apiBody {String} userLoginToAdd login члена беседы
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
 *  @apiErrorExample {json} NO_VALID_DATA
 *  {
 *      "error": true,
 *      "message": "NO_VALID_DATA" // conversationId || addedUserLogin - не верны
 *  }
 *  @apiUse nae
 *  @apiUse bre
 *  @apiUse bae
 */
members.post('/add', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
            const user = (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login);
            const addedUserData = yield (0, conversations_1.checkAccessToAddToConversation)(user, conversation, body.userLoginToAdd);
            if (addedUserData) {
                yield (0, conversations_1.updateConversationWithAddedUser)(conversation, addedUserData);
                res.status(200).send({ error: false, success: true });
            }
            else {
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
            }
        }
        catch (_) {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
    }));
});
exports.default = members;
