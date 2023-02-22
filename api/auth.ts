import express, {Request, Response, Router} from "express";
import {validateRequestWithAccess} from "./utils/validateRequestMethods";
import {db} from '../index';
import {AuthType} from "./databaseMethods/auth";
import {getPrivateUserData} from "./methods/user";

const auth: Router = express.Router();

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
        .then(({ userData }) => res.status(200).send({ error: false, data: getPrivateUserData(userData) }))
});

auth.post('/sessionId', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData }) => res.status(200).send({ error: false, data: getPrivateUserData(userData) }))
});

export default auth;