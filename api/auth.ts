import express, {Request, Response, Router} from "express";
import {validateRequest} from "./utils/validateRequestMethods";
import {IError, IValidRequestData} from "../interfaces/request";
import {db} from '../index';
import {AuthType, checkUserAccess} from "./databaseMethods/auth";
import {IPrivateUserData, IUserData} from "../interfaces/users";
import {ResponseError} from "../enums/responses";
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
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            checkUserAccess(db, data.auth, AuthType.PASSWORD)
                .then((userData: IUserData) => {
                    res.status(200).send({ error: false, data: getPrivateUserData(userData) });
                })
                .catch((error: IError) => {
                    res.status(200).send({ error: true, message: error.message })
                })
        })
});

auth.post('/sessionId', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            if (data.auth) {

            }
        })
});

export default auth;