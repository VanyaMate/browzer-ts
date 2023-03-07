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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAccess = exports.AuthType = void 0;
const responses_1 = require("../../enums/responses");
const bcrypt_1 = require("../utils/bcrypt");
const users_1 = require("./users");
var AuthType;
(function (AuthType) {
    AuthType["SESSION_KEY"] = "sessionKey";
    AuthType["PASSWORD"] = "password";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
const checkUserAccess = function (db, auth, type) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (auth) {
                const [login, authKey] = auth;
                const userData = yield (0, users_1.getUserDataByLogin)(db, login);
                const dbKey = userData[type];
                if ((type === AuthType.PASSWORD) ? yield (0, bcrypt_1.compare)(authKey, dbKey) : (authKey === dbKey)) {
                    resolve(userData);
                    return;
                }
            }
            reject({ message: responses_1.ResponseError.BAD_AUTH });
        }
        catch (error) {
            reject({ message: responses_1.ResponseError.BAD_AUTH });
        }
    }));
};
exports.checkUserAccess = checkUserAccess;
