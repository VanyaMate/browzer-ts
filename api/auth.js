"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequestMethods_1 = require("./utils/validateRequestMethods");
const index_1 = require("../index");
const auth_1 = require("./databaseMethods/auth");
const user_1 = require("./methods/user");
const users_1 = require("./databaseMethods/users");
const conversations_1 = require("./databaseMethods/conversations");
const notifications_1 = require("./databaseMethods/notifications");
const responses_1 = require("../enums/responses");
const auth = express_1.default.Router();
const getFullData = function (db, userData) {
    return new Promise((resolve, reject) => {
        try {
            const friendsRequestIn = (0, users_1.getPublicUserDataByLoginList)(db, userData.friendsRequestIn);
            const friendsRequestOut = (0, users_1.getPublicUserDataByLoginList)(db, userData.friendsRequestOut);
            const friends = (0, users_1.getPublicUserDataByLoginList)(db, userData.personalInfo.friends.value);
            const conversations = (0, conversations_1.getFullConversationsData)(db, userData.conversations);
            const notifications = (0, notifications_1.getNotificationsById)(db, userData.notifications);
            return Promise.all([
                friendsRequestIn,
                friendsRequestOut,
                friends,
                conversations,
                notifications
            ]).then((data) => {
                const [fReqIn, fReqOut, f, conv, notif] = data;
                const filledUserData = Object.assign(Object.assign({}, userData), { friendsRequestIn: fReqIn, friendsRequestOut: fReqOut, personalInfo: Object.assign(Object.assign({}, userData.personalInfo), { friends: {
                            value: f,
                            hidden: userData.personalInfo.friends.hidden
                        } }), conversations: conv, notifications: notif });
                resolve((0, user_1.getPrivateUserData)(filledUserData));
            }).catch((e) => reject({ message: e.message }));
        }
        catch (e) {
            reject({ message: responses_1.ResponseError.BAD_REQUEST });
        }
    });
};
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
auth.post('/pass', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.PASSWORD)
        .then(({ userData }) => {
        return getFullData(index_1.db, userData)
            .then((data) => res.status(200).send({ error: false, data }))
            .catch(e => res.status(200).send({ error: true, message: e.message }));
    })
        .catch(e => res.status(200).send({ error: true, message: e.message }));
});
auth.post('/sessionKey', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData }) => {
        return getFullData(index_1.db, userData)
            .then((data) => res.status(200).send({ error: false, data }))
            .catch(e => res.status(200).send({ error: true, message: e.message }));
    })
        .catch(e => res.status(200).send({ error: true, message: e.message }));
});
exports.default = auth;
