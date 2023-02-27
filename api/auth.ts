import express, {Request, Response, Router} from "express";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {db} from '../index';
import {AuthType} from "./databaseMethods/auth";
import {getPrivateUserData} from "./methods/user";
import {IPrivateUserData, IPublicUserData, IUserData} from "../interfaces/users";
import {getPublicUserDataByLoginList} from "./databaseMethods/users";
import {IConversation} from "../interfaces/conversations";
import {getFullConversationsData} from "./databaseMethods/conversations";
import {INotification} from "../interfaces/notifications";
import {getNotificationsById} from "./databaseMethods/notifications";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {ResponseError} from "../enums/responses";

const auth: Router = express.Router();

const getFullData = function (
    db: Firestore,
    userData: IUserData<string, string, string>
): Promise<IPrivateUserData<IPublicUserData<string>, INotification<string>, IConversation<IPublicUserData<string>>>> {
    return new Promise<IPrivateUserData<IPublicUserData<string>, INotification<string>, IConversation<IPublicUserData<string>>>>((resolve, reject) => {
        try {
            const friendsRequestIn: Promise<IPublicUserData<string>[]> = getPublicUserDataByLoginList(db, userData.friendsRequestIn);
            const friendsRequestOut: Promise<IPublicUserData<string>[]> = getPublicUserDataByLoginList(db, userData.friendsRequestOut);
            const friends: Promise<IPublicUserData<string>[]> = getPublicUserDataByLoginList(db, userData.personalInfo.friends.value);
            const conversations: Promise<IConversation<IPublicUserData<string>>[]> = getFullConversationsData(db, userData.conversations);
            const notifications: Promise<INotification<string>[]> = getNotificationsById(db, userData.notifications);

            return Promise.all([
                friendsRequestIn,
                friendsRequestOut,
                friends,
                conversations,
                notifications
            ]).then((data) => {
                const [fReqIn, fReqOut, f, conv, notif] = data;
                const filledUserData: IPrivateUserData<IPublicUserData<string>, INotification<string>, IConversation<IPublicUserData<string>>> = {
                    ...userData,
                    friendsRequestIn: fReqIn,
                    friendsRequestOut: fReqOut,
                    personalInfo: {
                        ...userData.personalInfo,
                        friends: {
                            value: f,
                            hidden: userData.personalInfo.friends.hidden
                        }
                    },
                    conversations: conv,
                    notifications: notif
                }

                resolve(getPrivateUserData(filledUserData as IUserData<any, any, any>));
            }).catch((e) => reject({ message: e.message }));
        } catch (e) {
            reject({ message: ResponseError.BAD_REQUEST });
        }
    })
}

/**
 * @api {post} /api/auth/pass Авторизация через логин:пароль
 * @apiName AuthByPass
 * @apiGroup auth
 * @apiVersion 0.0.0
 *
 * @apiUse authPass
 *
 * @apiSuccess {Boolean} error Статус
 * @apiSuccess {Object} data Данные авторизации
 * @apiSuccess {String} data.sessionId Ключ авторизации
 * @apiSuccess {Object} data.userData Приватная информация о пользователе
 * @apiSuccessExample {json} Response-Body:
 *  {
 *      "error": false,
 *      "data: {
 *          "sessionId": "qwertyuiop123zxcvbnm9877",
 *          "userData": {
 *              // ...
 *          }
 *      }
 *  }
 *
 * @apiError {Boolean} error Статус
 * @apiError {String} message Сообщение/код ошибки
 * @apiError {String} message.BAD_AUTH Неправильный логин/пароль
 * @apiUse nae
 */
auth.post('/pass', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.PASSWORD)
        .then(({ userData }) => {
            return getFullData(db, userData)
                .then((data) => res.status(200).send({ error: false, data }))
                .catch(e => res.status(200).send({ error: true, message: e.message }))
        })
        .catch(e => res.status(200).send({ error: true, message: e.message }))
});

auth.post('/sessionKey', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData }) => {
            return getFullData(db, userData)
                .then((data) => res.status(200).send({ error: false, data }))
                .catch(e => res.status(200).send({ error: true, message: e.message }))
        })
        .catch(e => res.status(200).send({ error: true, message: e.message }))
});

export default auth;