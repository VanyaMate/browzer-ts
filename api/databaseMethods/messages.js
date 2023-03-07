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
exports.addAsyncMessageNotification = exports.deleteMessage = exports.updateMessage = exports.createMessage = exports.getMessagesFromConversation = exports.getMessage = exports.getMessages = exports.getMessagesWithSnapOffsetWithLimit = exports.getMessageSnapWithOffset = void 0;
const COLLECTION_NAMES_1 = require("./COLLECTION_NAMES");
const notifications_1 = require("./notifications");
const index_1 = require("../../index");
const getMessageSnapWithOffset = function (db, conversationId, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        const snapList = yield db
            .collection(COLLECTION_NAMES_1.MESSAGES)
            .orderBy('creationTime', 'desc')
            .where('conversationId', '==', conversationId)
            .limit(offset)
            .get();
        return snapList.docs[offset - 1];
    });
};
exports.getMessageSnapWithOffset = getMessageSnapWithOffset;
const getMessagesWithSnapOffsetWithLimit = function (db, conversationId, offsetSnap, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db
            .collection(COLLECTION_NAMES_1.MESSAGES)
            .orderBy('creationTime', 'desc')
            .where('conversationId', '==', conversationId)
            .startAfter(offsetSnap)
            .limit(limit)
            .get();
    });
};
exports.getMessagesWithSnapOffsetWithLimit = getMessagesWithSnapOffsetWithLimit;
const getMessages = function (db, conversationId, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield db
            .collection(COLLECTION_NAMES_1.MESSAGES)
            .orderBy('creationTime', 'desc')
            .where('conversationId', '==', conversationId)
            .limit(limit)
            .get();
        return list.docs.map((message) => message.data());
    });
};
exports.getMessages = getMessages;
const getMessage = function (db, messageId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const document = yield db.collection(COLLECTION_NAMES_1.MESSAGES).doc(messageId).get();
        const message = document.data();
        if (message)
            resolve(message);
        else
            reject();
    }));
};
exports.getMessage = getMessage;
const getMessagesFromConversation = function (db, conversationId, limit, offset) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if ((conversationId !== undefined) &&
                (limit !== undefined) &&
                (offset !== undefined)) {
                if (offset === 0) {
                    const messages = yield (0, exports.getMessages)(db, conversationId, limit);
                    resolve(messages);
                    return;
                }
                const offsetLast = yield (0, exports.getMessageSnapWithOffset)(db, conversationId, offset);
                if (offsetLast) {
                    const limitSnap = yield (0, exports.getMessagesWithSnapOffsetWithLimit)(db, conversationId, offsetLast, limit);
                    const messages = limitSnap.docs.map((message) => message.data());
                    resolve(messages);
                    return;
                }
            }
            reject();
        }
        catch (error) {
            reject();
        }
    }));
};
exports.getMessagesFromConversation = getMessagesFromConversation;
const createMessage = function (db, message) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield db.collection(COLLECTION_NAMES_1.MESSAGES).doc(message.id).set(message);
        resolve(message);
    }));
};
exports.createMessage = createMessage;
const updateMessage = function (db, message) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield db.collection(COLLECTION_NAMES_1.MESSAGES).doc(message.id).set(message);
        resolve(true);
    }));
};
exports.updateMessage = updateMessage;
const deleteMessage = function (db, messageId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield db.collection(COLLECTION_NAMES_1.MESSAGES).doc(messageId).delete();
        resolve(true);
    }));
};
exports.deleteMessage = deleteMessage;
const addAsyncMessageNotification = function (db, userData, message, members, type) {
    return __awaiter(this, void 0, void 0, function* () {
        Promise.all(members.map((member) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, notifications_1.addNotification)(db, member, type, {
                icon: userData.avatar,
                title: userData.login,
                message: `Новое сообщение`,
                data: {
                    conversationId: message.conversationId,
                    messageId: message.id
                }
            });
        }))).then((notifications) => {
            for (let i = 0; i < members.length; i++) {
                const socketConnection = index_1.socketManager.connections[members[i]];
                if (socketConnection) {
                    index_1.socketManager.sendMessage(socketConnection, {
                        type,
                        data: {
                            message,
                            notification: notifications[i]
                        }
                    });
                }
            }
        });
    });
};
exports.addAsyncMessageNotification = addAsyncMessageNotification;
