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
const responses_1 = require("../enums/responses");
const messages_1 = require("./methods/messages");
const messages_2 = require("./databaseMethods/messages");
const conversations_1 = require("./databaseMethods/conversations");
const conversation_1 = require("./methods/conversation");
const messages_3 = require("../enums/messages");
const notifications_1 = require("../enums/notifications");
const helpers_1 = require("../utils/helpers");
const messages = express_1.default.Router();
messages.post('/create', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        if (body.text && body.conversationId) {
            const data = (0, messages_1.createMessageData)(body, messages_3.SourceType.USER, userData.login);
            const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
            if (conversation) {
                (0, messages_2.createMessage)(index_1.db, data)
                    .then((message) => {
                    const members = conversation.members.filter((member) => member.login !== userData.login);
                    (0, messages_2.addAsyncMessageNotification)(index_1.db, userData, message, members.map((m) => m.login), notifications_1.NotificationType.NEW_MESSAGE);
                    res.status(200).send({ error: false, message, tempId: body.tempId || null });
                })
                    .catch((error) => {
                    res.status(200).send({ error: true, message: error.message });
                });
            }
            else {
                res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
            }
            return;
        }
        throw new Error();
    }))
        .catch((_) => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
messages.post('/change', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield (0, messages_2.getMessage)(index_1.db, body.messageId);
        const oldText = message.text;
        if ((message === null || message === void 0 ? void 0 : message.from.name) === userData.login) {
            message.text = body.text || message.text;
            message.additional = body.additional || message.additional;
            message.changed = true;
            const conversation = yield (0, conversations_1.getConversationData)(index_1.db, message.conversationId, userData.login);
            const conversationMembers = conversation.members.map((member) => member.login);
            const notificationMember = (0, helpers_1.getWithoutValue)(conversationMembers, userData.login);
            (0, conversations_1.createAsyncNotifications)(userData, notificationMember, {
                type: notifications_1.NotificationType.MESSAGE_CHANGED,
                text: 'Изменил сообщение',
                data: {
                    name: 'message',
                    value: { oldText, message: message }
                }
            });
            return yield (0, messages_2.updateMessage)(index_1.db, message)
                .then(() => res.status(200).send({ error: false, success: true }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
        }
    }))
        .catch((error) => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
messages.post('/delete', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield (0, messages_2.getMessage)(index_1.db, body.messageId);
        if (message.from.name === userData.login) {
            return yield (0, messages_2.deleteMessage)(index_1.db, body.messageId)
                .then(() => res.status(200).send({ error: false, success: true }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
        }
    }))
        .catch((error) => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
messages.post('/getFromConversation', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = yield (0, conversations_1.getConversationData)(index_1.db, body.conversationId, userData.login);
        if (conversation && (0, conversation_1.getMemberDataByLogin)(conversation.members, userData.login)) {
            (0, messages_2.getMessagesFromConversation)(index_1.db, body.conversationId, body.limit, body.offset)
                .then((messages) => res.status(200).send({ error: false, messages }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
        }
        else {
            res.status(200).send({ error: true, message: responses_1.ResponseError.NO_ACCESS });
        }
    }));
});
exports.default = messages;
