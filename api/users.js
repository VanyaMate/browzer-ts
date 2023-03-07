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
const users_1 = require("./methods/users");
const responses_1 = require("../enums/responses");
const users_2 = require("./databaseMethods/users");
const index_1 = require("../index");
const helpers_1 = require("../utils/helpers");
const users = express_1.default.Router();
users.post('/create', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        const validData = (0, users_1.validateUserDataForCreate)(data.body);
        if (validData && !(yield (0, users_2.checkLoginExist)(index_1.db, validData.login))) {
            const [password, sessionKey] = yield (0, users_1.createHashes)(validData.password, validData.login);
            const userData = (0, users_1.createUserData)(Object.assign(Object.assign({}, validData), { sessionKey, password }));
            return (0, users_2.createUser)(index_1.db, userData).then((data) => res.status(200).send({ error: false, data }));
        }
        res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
    }))
        .catch((error) => res.status(200).send({ error: true, message: error.message }));
});
users.post('/get', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => {
        const { login } = (0, helpers_1.convertJsonTo)(data.body);
        (0, users_2.getPublicUserDataByLogin)(index_1.db, login)
            .then((publicData) => res.status(200).send({ error: false, data: publicData }))
            .catch((error) => res.status(200).send({ error: true, message: error.message }));
    });
});
users.post('/getList', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => {
        const { login, limit, offset } = (0, helpers_1.convertJsonTo)(data.body);
        (0, users_2.getPublicUsersDataByLogin)(index_1.db, login, limit, offset)
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(200).send({ error: true, message: error.message }));
    });
});
users.post('/getPublicDataByLoginList', (req, res) => {
    (0, validateRequestMethods_1.validateRequest)(req, res)
        .then((data) => {
        const { loginList } = (0, helpers_1.convertJsonTo)(data.body);
        (0, users_2.getPublicUserDataByLoginList)(index_1.db, loginList)
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(200).send({ error: true, message: error.message }));
    });
});
exports.default = users;
