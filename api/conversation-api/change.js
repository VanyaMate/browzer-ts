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
const index_1 = require("../../index");
const auth_1 = require("../databaseMethods/auth");
const conversations_1 = require("../databaseMethods/conversations");
const responses_1 = require("../../enums/responses");
const members_1 = __importDefault(require("./members"));
const conversation_1 = require("../methods/conversation");
const change = express_1.default.Router();
change.post('/name', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
        const user = (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login);
        if (user && conversation) {
            if ((0, conversation_1.checkRoleAccess)(user.role, conversation.preferences.change)) {
                conversation.name = body.value;
                (0, conversations_1.updateConversationField)(index_1.db, body.conversationId, { name: body.value })
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST }));
            }
            else {
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
            }
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
    })).catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
change.post('/icon', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY).then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
        const user = (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login);
        if (user) {
            if ((0, conversation_1.checkRoleAccess)(user.role, conversation.preferences.change)) {
                conversation.icon = body.value;
                (0, conversations_1.updateConversationField)(index_1.db, body.conversationId, { icon: body.value })
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.BAD_REQUEST }));
            }
            else {
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
            }
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA });
        }
    })).catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
change.use('/members', members_1.default);
exports.default = change;
