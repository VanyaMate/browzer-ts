"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createAsyncNotifications = exports.getFullConversationsData = exports.getConversationsData = exports.checkAccessToAddToConversation = exports.updateConversationWithAddedUser = exports.deleteConversation = exports.deleteConversationFromAllMembers = exports.updateConversationField = exports.updateConversationData = exports.setConversationToAllMembers = exports.getConversationData = exports.checkMembersToCreateConversation = exports.createConversation = void 0;
const conversations_1 = require("../../enums/conversations");
const COLLECTION_NAMES_1 = require("./COLLECTION_NAMES");
const crypto = __importStar(require("crypto"));
const responses_1 = require("../../enums/responses");
const user_1 = require("../../enums/user");
const user_2 = require("./user");
const conversation_1 = require("../methods/conversation");
const index_1 = require("../../index");
const users_1 = require("./users");
const user_3 = require("../methods/user");
const notifications_1 = require("./notifications");
const messages_1 = require("./messages");
const createConversation = function (db, type, members, name) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const id = crypto.randomUUID();
            const conversation = (0, conversation_1.getConversationDataForCreate)(id, type, members, name);
            const membersData = members.map((member) => {
                const data = member.data;
                member.addedTime = Date.now();
                delete member.data;
                return data;
            });
            yield db.collection(COLLECTION_NAMES_1.CONVERSATIONS).doc(id).set(conversation);
            members.forEach((member, index) => member.data = membersData[index]);
            resolve(conversation);
        }
        catch (error) {
            reject({ message: responses_1.ResponseError.BAD_REQUEST });
        }
    }));
};
exports.createConversation = createConversation;
const checkMembersToCreateConversation = function (db, members, withLogin, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const conversationMembers = yield Promise.all(members.map((login) => __awaiter(this, void 0, void 0, function* () {
            const document = yield db.collection(COLLECTION_NAMES_1.USERS).doc(login).get();
            const user = document.data();
            if (user === undefined)
                return false;
            if (user.preferences.friends === user_1.AccessType.NO_ONE)
                return false;
            if (user.preferences.friends === user_1.AccessType.FRIENDS) {
                return user.personalInfo.friends.value.some((friend) => friend === withLogin);
            }
            return {
                login: user.login,
                role: type === conversations_1.ConversationType.SINGLE ? conversations_1.ConversationMemberRole.OWNER : conversations_1.ConversationMemberRole.SIMPLE,
                data: (0, user_3.getPublicUserData)(user)
            };
        })));
        if (conversationMembers.every((member) => member)) {
            return conversationMembers;
        }
        else {
            return false;
        }
    });
};
exports.checkMembersToCreateConversation = checkMembersToCreateConversation;
const getConversationData = function (db, id, withLogin) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (id && withLogin) {
            const conversation = (yield db.collection(COLLECTION_NAMES_1.CONVERSATIONS).doc(id).get()).data();
            return (conversation && conversation.members.some((member) => member.login === withLogin))
                ? resolve(conversation)
                : reject();
        }
        reject();
    }));
};
exports.getConversationData = getConversationData;
const setConversationToAllMembers = function (db, members, conversationId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(members.map((member) => __awaiter(this, void 0, void 0, function* () {
            const document = yield db.collection(COLLECTION_NAMES_1.USERS).doc(member.login).get();
            const user = document.data();
            !user.conversations.some((id) => id === conversationId) && user.conversations.push(conversationId);
            return yield (0, user_2.updateUserData)(db, user);
        })));
        resolve(true);
    }));
};
exports.setConversationToAllMembers = setConversationToAllMembers;
const updateConversationData = function (db, conversation) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.collection(COLLECTION_NAMES_1.CONVERSATIONS).doc(conversation.id).set(conversation);
            resolve(true);
        }
        catch (error) {
            reject({ message: error.message });
        }
    }));
};
exports.updateConversationData = updateConversationData;
const updateConversationField = function (db, conversationId, field) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.collection(COLLECTION_NAMES_1.CONVERSATIONS).doc(conversationId).update(field);
            resolve(true);
        }
        catch (error) {
            reject({ message: error.message });
        }
    }));
};
exports.updateConversationField = updateConversationField;
const deleteConversationFromAllMembers = function (db, members, conversationId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(members.map((member) => __awaiter(this, void 0, void 0, function* () {
            const document = yield db.collection(COLLECTION_NAMES_1.USERS).doc(member.login).get();
            const user = document.data();
            user.conversations = user.conversations.filter((id) => id !== conversationId);
            return yield (0, user_2.updateUserData)(db, user);
        })));
        resolve(true);
    }));
};
exports.deleteConversationFromAllMembers = deleteConversationFromAllMembers;
const deleteConversation = function (db, conversationId, ownerLogin) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const conversation = yield (0, exports.getConversationData)(db, conversationId, ownerLogin);
            const owner = (0, conversation_1.getMemberDataByLogin)(conversation.members, ownerLogin);
            if (owner && (owner.role === conversations_1.ConversationMemberRole.OWNER ||
                (0, conversation_1.checkGrossRole)(owner.role, conversation.preferences.delete))) {
                yield (0, exports.deleteConversationFromAllMembers)(db, conversation.members, conversationId);
                yield db.collection(COLLECTION_NAMES_1.CONVERSATIONS).doc(conversationId).delete();
                resolve(conversation.members.map((member) => member.login));
                return;
            }
            reject();
        }
        catch (_) {
            reject();
        }
    }));
};
exports.deleteConversation = deleteConversation;
const updateConversationWithAddedUser = function (conversation, addedUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (conversation.members.every((member) => member.login !== addedUserData.login)) {
            conversation.members.push({
                login: addedUserData.login,
                role: conversations_1.ConversationMemberRole.SIMPLE,
                addedTime: Date.now(),
            });
            yield (0, exports.updateConversationData)(index_1.db, conversation);
        }
        if (addedUserData.conversations.every((id) => id !== conversation.id)) {
            addedUserData.conversations.push(conversation.id);
            yield (0, user_2.updateUserData)(index_1.db, addedUserData);
        }
        return true;
    });
};
exports.updateConversationWithAddedUser = updateConversationWithAddedUser;
const checkAccessToAddToConversation = function (userWhoAdds, conversation, userLoginToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userWhoAdds && (0, conversation_1.checkRoleAccess)(userWhoAdds.role, conversation.preferences.members.add)) {
            const addedUserData = yield (0, users_1.getUserDataByLogin)(index_1.db, userLoginToAdd);
            if ((addedUserData.preferences.conversations !== user_1.AccessType.NO_ONE) &&
                (((addedUserData.preferences.conversations === user_1.AccessType.FRIENDS) &&
                    (0, user_3.checkIsFriendOf)(userWhoAdds.login, addedUserData.personalInfo.friends)) ||
                    (addedUserData.preferences.conversations === user_1.AccessType.ALL))) {
                return addedUserData;
            }
        }
        return false;
    });
};
exports.checkAccessToAddToConversation = checkAccessToAddToConversation;
const getConversationsData = function (db, conversationList) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (conversationList.length === 0) {
                resolve([]);
                return;
            }
            const collection = db.collection(COLLECTION_NAMES_1.CONVERSATIONS);
            const batches = [];
            while (conversationList.length) {
                const batch = conversationList.splice(0, 10);
                batches.push(collection
                    .where('id', 'in', batch)
                    .get()
                    .then((result) => result.docs.map((conv) => conv.data())));
            }
            const conversations = yield Promise.all(batches).then(batches => batches.flat());
            resolve(conversations);
        }
        catch (_) {
            reject();
        }
    }));
};
exports.getConversationsData = getConversationsData;
const getFullConversationsData = function (db, conversationsList) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (conversationsList.length === 0) {
                resolve([]);
                return;
            }
            const messagesList = [...conversationsList];
            const conversationsCollection = db.collection(COLLECTION_NAMES_1.CONVERSATIONS);
            const conversationsBatches = [];
            while (conversationsList.length) {
                const batch = conversationsList.splice(0, 10);
                conversationsBatches.push(conversationsCollection
                    .orderBy('creationTime', 'desc')
                    .where('id', 'in', batch)
                    .get()
                    .then((result) => result.docs.map((conv) => conv.data())));
            }
            const messagesPromises = [];
            for (let i = 0; i < messagesList.length; i++) {
                messagesPromises.push((0, messages_1.getMessagesFromConversation)(db, messagesList[i], 1, 0));
            }
            const conversationsData = yield Promise.all(conversationsBatches).then(batches => batches.flat());
            const messagesData = yield Promise.all(messagesPromises).then(batches => batches.flat());
            for (let i = 0; i < conversationsData.length; i++) {
                const conversation = conversationsData[i];
                for (let j = 0; j < messagesData.length; j++) {
                    const message = messagesData[j];
                    if (conversation.id === message.conversationId) {
                        conversation.messages.push(message);
                        break;
                    }
                }
            }
            const loginList = [...new Set(conversationsData.map((c) => c.members).flat().map((m) => m.login))];
            const usersPublicData = yield (0, users_1.getPublicUserDataByLoginList)(db, loginList);
            for (let j = 0; j < conversationsData.length; j++) {
                const conversation = conversationsData[j];
                for (let x = 0; x < conversation.members.length; x++) {
                    const member = conversation.members[x];
                    for (let i = 0; i < usersPublicData.length; i++) {
                        const userData = usersPublicData[i];
                        if (member.login === userData.login) {
                            member.data = userData;
                            break;
                        }
                    }
                }
            }
            resolve(conversationsData);
        }
        catch (_) {
            console.log(_);
            reject(_);
        }
    }));
};
exports.getFullConversationsData = getFullConversationsData;
const createAsyncNotifications = function (userData, members, props) {
    Promise.all(members.map((login) => {
        return (0, notifications_1.addNotification)(index_1.db, login, props.type, {
            icon: userData.avatar,
            title: userData.login,
            message: props.text,
            data: {}
        });
    }))
        .then((notifications) => {
        for (let i = 0; i < members.length; i++) {
            const socketConnection = index_1.socketManager.connections[members[i]];
            if (socketConnection) {
                index_1.socketManager.sendMessage(socketConnection, {
                    type: props.type,
                    data: {
                        [props.data.name]: props.data.value,
                        notification: notifications[i]
                    }
                });
            }
        }
    });
};
exports.createAsyncNotifications = createAsyncNotifications;
