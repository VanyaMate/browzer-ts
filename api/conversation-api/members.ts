import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {ConversationMemberRole} from "../../enums/conversations";
import {db} from "../../index";
import {AuthType} from "../databaseMethods/auth";
import {
    checkAccessToAddToConversation,
    getConversationData,
    updateConversationData,
    updateConversationWithAddedUser
} from "../databaseMethods/conversations";
import {ResponseError} from "../../enums/responses";
import {checkGrossRole, checkRoleAccess, getMemberDataByLogin} from "../methods/conversation";
import {IConversationMember} from "../../interfaces/conversations";
import {IError} from "../../interfaces/request";
import {AccessType} from "../../enums/user";
import {checkIsFriendOf} from "../methods/user";
import {checkConversationRole} from "../utils/checkEnums";
import {removeConversationFromLogin, updateUserData} from "../databaseMethods/user";
import {getUserDataByLogin} from "../databaseMethods/users";

const members = express.Router();

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
members.post('/role', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        userLoginToChange: string,
        role: ConversationMemberRole
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body}) => {
        const validRole = checkConversationRole(body.role);

        if (validRole) {
            const conversation = await getConversationData(db, body.conversationId, userData.login);
            const changeMember = getMemberDataByLogin(conversation.members, body.userLoginToChange);
            const user = getMemberDataByLogin(conversation.members, userData.login);

            if (
                user &&
                changeMember
            ) {
                if (
                    checkGrossRole(user.role, changeMember.role) &&
                    checkRoleAccess(user.role, conversation.preferences.members.role)
                ) {
                    changeMember.role = body.role;
                    updateConversationData(db, conversation)
                        .then(() => res.status(200).send({error: false, success: true}))
                        .catch(() => res.status(200).send({error: true, message: ResponseError.BAD_REQUEST}))
                } else {
                    res.status(200).send({error: true, message: ResponseError.NO_ACCESS});
                }
                return;
            }
        }

        res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
    });
})

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
members.post('/remove', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        userLoginToRemove: string
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body }) => {
        const conversation = await getConversationData(db, body.conversationId, userData.login);
        const user: IConversationMember<any> | null =
            getMemberDataByLogin(conversation.members, userData.login);
        const removedMember: IConversationMember<any> | null =
            getMemberDataByLogin(conversation.members, body.userLoginToRemove);

        if (user && removedMember) {
            if(
                checkGrossRole(user.role, removedMember.role) &&
                checkRoleAccess(user.role, conversation.preferences.members.remove)
            ) {
                conversation.members = conversation.members.filter(
                    (member) => member.login !== body.userLoginToRemove
                );

                updateConversationData(db, conversation)
                    .then(async () => {
                        const removed = await removeConversationFromLogin(
                            db, body.userLoginToRemove, body.conversationId
                        );

                        if (removed) {
                            res.status(200)
                                .send({ error: false, success: true })
                            return;
                        }
                        throw new Error(ResponseError.BAD_REQUEST);
                    })
                    .catch((error: unknown) => res.status(200)
                        .send({ error: true, message: (error as IError).message }))
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        } else {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        }
    })
})

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
members.post('/add', (req: Request, res: Response) => {
    validateRequestWithAccess<{
        conversationId: string,
        userLoginToAdd: string,
    }>(req, res, db, AuthType.SESSION_KEY).then(async ({ userData, body }) => {
        try {
            const conversation = await getConversationData(db, body.conversationId, userData.login);
            const user = getMemberDataByLogin(conversation.members, userData.login);
            const addedUserData = await checkAccessToAddToConversation(user, conversation, body.userLoginToAdd);

            if (addedUserData) {
                await updateConversationWithAddedUser(conversation, addedUserData);
                res.status(200).send({ error: false, success: true });
            } else {
                res.status(200).send({ error: true, message: ResponseError.NO_ACCESS });
            }
        } catch (_) {
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        }
    })
})

export default members;