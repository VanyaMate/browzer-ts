import express, {Request, Response, Router} from "express";
import {validateRequest} from "./utils/validateRequestMethods";

const auth: Router = express.Router();

/**
 * @api {post} /api/auth/pass Авторизация через логин:пароль
 * @apiName AuthByPass
 * @apiGroup Auth
 * @apiVersion 0.0.0
 *
 * @apiUse DefaultAuthHeader
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
 * @apiErrorExample {json} Error-Body:
 *  {
 *      "error": true,
 *      "message": "BAD_AUTH"
 *  }
 */
auth.post('/pass', (req: Request, res: Response) => {

});

auth.post('/sessionId', (req: Request, res: Response) => {

});

export default auth;