"use strict";
/**
 * @apiDefine authPass
 * @apiHeader {String} auth Данные авторизации пользователя в формате login:password
 * @apiHeaderExample {json} auth:
 *  {
 *      "auth": "admin:qwerty12345"
 *  }
 */
/**
 * @apiDefine bre
 * @apiErrorExample {json} BAD_REQUEST
 *  {
 *      "error": true,
 *      "message": "BAD_REQUEST" // Вероятнее всего ошибка на стороне сервера
 *  }
 */
/**
 * @apiDefine bae
 * @apiErrorExample {json} BAD_AUTH
 *  {
 *      "error": true,
 *      "message": "BAD_AUTH" // Ошибка авторизации
 *  }
 */
/**
 * @apiDefine nae
 * @apiErrorExample {json} NO_ACCESS
 *  {
 *      "error": true,
 *      "message": "NO_ACCESS" // Ошибка доступа
 *  }
 */
/**
 * @apiDefine authSession
 * @apiHeader {String} auth Данные авторизации пользователя в формате login:sessionKey
 * @apiHeaderExample {json} auth:
 *  {
 *      "auth": "admin:qx5903_sad.asjk35aslklxaasmslajt9uj3"
 *  }
 */ 
