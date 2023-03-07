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
exports.removeConversationFromLogin = exports.updateUserData = void 0;
const COLLECTION_NAMES_1 = require("./COLLECTION_NAMES");
const responses_1 = require("../../enums/responses");
const users_1 = require("./users");
const updateUserData = function (db, userData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.collection(COLLECTION_NAMES_1.USERS).doc(userData.login).set(userData);
            resolve(true);
        }
        catch (error) {
            reject({ message: responses_1.ResponseError.BAD_REQUEST });
        }
    }));
};
exports.updateUserData = updateUserData;
const removeConversationFromLogin = function (db, login, conversationId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield (0, users_1.getUserDataByLogin)(db, login);
            if (userData) {
                userData.conversations = userData.conversations.filter((id) => id !== conversationId);
            }
            yield (0, exports.updateUserData)(db, userData);
            resolve(true);
        }
        catch (_) {
            reject(false);
        }
    }));
};
exports.removeConversationFromLogin = removeConversationFromLogin;
