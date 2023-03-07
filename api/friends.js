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
const validateRequestMethods_1 = require("./utils/validateRequestMethods");
const auth_1 = require("./databaseMethods/auth");
const index_1 = require("../index");
const users_1 = require("./databaseMethods/users");
const user_1 = require("../enums/user");
const responses_1 = require("../enums/responses");
const friends_1 = require("./databaseMethods/friends");
const friends = express_1.default.Router();
friends.post('/add', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userData.personalInfo.friends.value.some((friendLogin) => friendLogin === body.login) &&
            !userData.friendsRequestOut.some((friendLogin) => friendLogin === body.login) &&
            (userData.login !== body.login)) {
            const userToAdd = yield (0, users_1.getUserDataByLogin)(index_1.db, body.login);
            if (userToAdd && userToAdd.preferences.friends === user_1.AccessType.ALL) {
                (userData.friendsRequestIn.some((friendLogin) => friendLogin === userToAdd.login)
                    ? friends_1.addToFriends
                    : friends_1.addToRequests)(index_1.db, userData, userToAdd)
                    .then(() => {
                    res.status(200).send({ error: false, success: true });
                })
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
            }
            else
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
        }
        else
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
    }));
});
friends.post('/remove', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        if ((userData.personalInfo.friends.value.some((friendLogin) => friendLogin === body.login) ||
            userData.friendsRequestOut.some((friendLogin) => friendLogin === body.login) ||
            userData.friendsRequestIn.some((friendLogin) => friendLogin === body.login)) &&
            (userData.login !== body.login)) {
            const userToRemove = yield (0, users_1.getUserDataByLogin)(index_1.db, body.login);
            if (userToRemove) {
                (userData.personalInfo.friends.value.some((login) => login === body.login)
                    ? friends_1.removeFromFriends :
                    userData.friendsRequestOut.some((login) => login === body.login) ?
                        friends_1.removeFromRequestOut : friends_1.removeFromRequestIn)(index_1.db, userData, userToRemove)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
            }
            else
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
        else
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
    }));
});
exports.default = friends;
