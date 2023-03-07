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
const auth_1 = require("../databaseMethods/auth");
const index_1 = require("../../index");
const helpers_1 = require("../../utils/helpers");
const validationMethods_1 = require("../../utils/validationMethods");
const users_1 = require("../methods/users");
const user_1 = require("../databaseMethods/user");
const responses_1 = require("../../enums/responses");
const security = express_1.default.Router();
security.post('/changePass', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => {
        (0, auth_1.checkUserAccess)(index_1.db, data.auth, auth_1.AuthType.PASSWORD)
            .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
            const { password } = (0, helpers_1.convertJsonTo)(data.body);
            if ((0, validationMethods_1.validPassword)(password)) {
                const [hashPassword, hashSessionKey] = yield (0, users_1.createHashes)(password, userData.login);
                userData.password = hashPassword;
                userData.sessionKey = hashSessionKey;
                return yield (0, user_1.updateUserData)(index_1.db, userData)
                    .then(() => res.status(200).send({ error: false, sessionKey: hashSessionKey }));
            }
            res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST });
        }))
            .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_AUTH }));
    });
});
security.post('/resetSessionKey', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res).then((data) => {
        (0, auth_1.checkUserAccess)(index_1.db, data.auth, auth_1.AuthType.PASSWORD)
            .then((userData) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, users_1.getHashByLogin)(userData.login)
                .then((hash) => userData.sessionKey = hash)
                .then(() => (0, user_1.updateUserData)(index_1.db, userData))
                .then(() => res.status(200).send({ error: false, sessionKey: userData.sessionKey }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST }));
        }))
            .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_AUTH }));
    });
});
exports.default = security;
